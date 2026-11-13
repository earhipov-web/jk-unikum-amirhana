"use client";

import { useId, useState } from "react";
import { CONTACTS } from "@/lib/data";
import { LIMITS, validateConsultation, type FieldErrors } from "@/lib/consultation";

type Status = "idle" | "sending" | "done" | "error";

const inputCls =
  "mt-1.5 block w-full rounded-xl border border-line bg-cream px-4 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-lake aria-[invalid=true]:border-warn";

export default function ConsultForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const check = validateConsultation(payload);
    setErrors(check.errors);
    setFormError("");
    if (!check.data) {
      const first = Object.keys(check.errors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: { error?: string; fields?: FieldErrors } = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        return;
      }
      if (body.fields) setErrors(body.fields);
      setFormError(body.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.");
      setStatus("error");
    } catch {
      setFormError("Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl bg-lake-soft p-8 text-lake-deep">
        <h3 className="font-display text-xl font-medium">Заявка отправлена</h3>
        <p className="mt-3 text-sm leading-relaxed">
          С вами свяжутся по указанному телефону. Если вопрос срочный, позвоните в офис продаж
          застройщика:{" "}
          <a href={CONTACTS.phoneHref} className="tnum font-medium underline">
            {CONTACTS.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 min-h-11 rounded-full border border-lake-deep/40 px-5 text-sm font-medium hover:border-lake-deep"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  const err = (key: keyof FieldErrors) =>
    errors[key] ? (
      <p id={`${id}-${key}-err`} className="mt-1.5 text-sm text-warn">
        {errors[key]}
      </p>
    ) : null;
  const aria = (key: keyof FieldErrors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            Имя
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="given-name"
            maxLength={LIMITS.name}
            required
            className={inputCls}
            {...aria("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-medium">
            Телефон
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 900 000-00-00"
            maxLength={LIMITS.phone}
            required
            className={inputCls}
            {...aria("phone")}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium">
            Электронная почта
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@mail.ru"
            maxLength={LIMITS.email}
            required
            className={inputCls}
            {...aria("email")}
          />
          {err("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-comment`} className="text-sm font-medium">
            Что вы хотите узнать <span className="font-normal text-muted">— необязательно</span>
          </label>
          <textarea
            id={`${id}-comment`}
            name="comment"
            rows={4}
            maxLength={LIMITS.comment}
            placeholder="Например: двухкомнатная до 16 млн, семейная ипотека, хочу на экскурсию"
            className={inputCls}
          />
        </div>

        {/* Ловушка для ботов: скрыта от людей и скринридеров */}
        <div aria-hidden inert className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Не заполняйте это поле
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--lake)]"
              {...aria("consent")}
            />
            <span className="text-muted">
              Я согласен на обработку персональных данных для связи со мной по этой заявке
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-5 rounded-xl bg-warn/10 px-4 py-3 text-sm text-warn">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sage px-6 text-base font-medium text-ink transition-colors hover:bg-sage-deep disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="mt-3 text-xs text-muted">
        Консультация бесплатная и ни к чему не обязывает. Заявку получает владелец этого сайта,
        а не застройщик.
      </p>
    </form>
  );
}
