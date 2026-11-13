// Общая валидация заявки: используется и в форме, и на сервере.

export type ConsultationInput = {
  name: string;
  phone: string;
  email: string;
  comment: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>;

export const LIMITS = { name: 80, phone: 20, email: 120, comment: 1000 } as const;

// Простая линейная проверка без вложенных квантификаторов (без риска ReDoS).
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@.]{1,63}(\.[^\s@.]{1,63}){1,4}$/;
const NAME_RE = /^[\p{L}\s'’.-]+$/u;

// Убираем управляющие символы, чтобы они не попадали в журнал заявок.
const clean = (v: unknown, max: number, keepNewlines = false) => {
  if (typeof v !== "string") return "";
  const re = keepNewlines ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  return v.replace(re, " ").trim().slice(0, max);
};

export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
    return "+7" + digits.slice(1);
  }
  if (digits.length === 10) return "+7" + digits;
  return null;
}

export function validateConsultation(raw: Record<string, unknown>): {
  data: ConsultationInput | null;
  errors: FieldErrors;
} {
  const name = clean(raw.name, LIMITS.name);
  const phoneRaw = clean(raw.phone, LIMITS.phone);
  const email = clean(raw.email, LIMITS.email).toLowerCase();
  const comment = clean(raw.comment, LIMITS.comment, true);
  const consent = raw.consent === true;

  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = "Укажите имя — хотя бы две буквы.";
  else if (!NAME_RE.test(name)) errors.name = "В имени могут быть только буквы, пробел и дефис.";

  const phone = normalizePhone(phoneRaw);
  if (!phone) errors.phone = "Введите номер в формате +7 900 000-00-00.";

  if (!EMAIL_RE.test(email)) errors.email = "Проверьте адрес почты — например, name@mail.ru.";
  if (!consent) errors.consent = "Без согласия мы не можем принять заявку.";

  if (Object.keys(errors).length > 0 || !phone) return { data: null, errors };
  return { data: { name, phone, email, comment, consent }, errors };
}
