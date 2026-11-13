import { randomUUID } from "node:crypto";
import { appendFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { validateConsultation } from "@/lib/consultation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5000;

// Простое ограничение частоты в памяти процесса. Для нескольких серверов нужен общий стор (Redis).
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
    if (hits.size > MAX_TRACKED_IPS) hits.clear();
  }
  return false;
}

// Общий потолок на все адреса сразу: заголовок с IP можно подделать,
// поэтому лимит «на IP» не должен быть единственной защитой от флуда.
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;
const GLOBAL_MAX = 200;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
let globalHits: number[] = [];

function globallyLimited(): boolean {
  const now = Date.now();
  globalHits = globalHits.filter((t) => now - t < GLOBAL_WINDOW_MS);
  if (globalHits.length >= GLOBAL_MAX) return true;
  globalHits.push(now);
  return false;
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const DAILY_MAX = 300;

/**
 * Сохраняет заявку. Возвращает false, если достигнут лимит хранилища.
 * На Netlify — в закрытое хранилище Netlify Blobs (доступно только владельцу сайта),
 * локально — в файл data/leads.jsonl вне public/.
 */
async function storeLead(record: Record<string, unknown>): Promise<boolean> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "leads", consistency: "strong" });
    const day = new Date().toISOString().slice(0, 10);
    // Суточный потолок: флудом нельзя бесконечно наполнять хранилище.
    const { blobs } = await store.list({ prefix: `${day}/` });
    if (blobs.length >= DAILY_MAX) return false;
    // Ключ собирается только из даты и случайного UUID — пользовательский ввод в него не попадает.
    await store.setJSON(`${day}/${Date.now()}-${randomUUID()}`, record);
    return true;
  } catch (err) {
    // Вне Netlify хранилища нет — пишем в локальный файл. Остальные ошибки пробрасываем.
    if (!(err instanceof Error) || err.name !== "MissingBlobsEnvironmentError") throw err;
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "leads.jsonl");
  const size = await stat(file).then((s) => s.size, () => 0);
  if (size > MAX_FILE_BYTES) return false;
  await appendFile(file, JSON.stringify(record) + "\n", { encoding: "utf8", mode: 0o600 });
  return true;
}

const json = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  // Защита от CSRF: принимаем только запросы со своего сайта и только JSON.
  if (!sameOrigin(req)) return json({ error: "Запрос отклонён." }, 403);
  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ error: "Неверный формат запроса." }, 415);
  }

  // На Netlify настоящий адрес клиента приходит в x-nf-client-connection-ip — его нельзя подделать.
  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return json({ error: "Слишком много заявок. Попробуйте через 10 минут или позвоните нам." }, 429);
  }

  const text = await req.text();
  if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) {
    return json({ error: "Слишком длинное сообщение." }, 413);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Неверный формат запроса." }, 400);
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return json({ error: "Неверный формат запроса." }, 400);
  }
  const body = raw as Record<string, unknown>;

  // Ловушка для ботов: поле скрыто от людей. Отвечаем «успехом», ничего не сохраняя.
  if (typeof body.website === "string" && body.website.length > 0) {
    return json({ ok: true }, 200);
  }

  const { data, errors } = validateConsultation(body);
  if (!data) return json({ error: "Проверьте поля формы.", fields: errors }, 422);

  if (globallyLimited()) {
    return json({ error: "Сейчас много заявок. Позвоните нам: +7 (843) 295-53-83." }, 429);
  }

  try {
    const stored = await storeLead({ ...data, createdAt: new Date().toISOString() });
    if (!stored) {
      return json({ error: "Сейчас много заявок. Позвоните нам: +7 (843) 295-53-83." }, 429);
    }
  } catch {
    // Не раскрываем детали ошибки и не пишем персональные данные в лог.
    console.error("consultation: failed to store lead");
    return json({ error: "Не удалось отправить заявку. Позвоните нам: +7 (843) 295-53-83." }, 500);
  }

  return json({ ok: true }, 200);
}
