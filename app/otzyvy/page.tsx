import type { Metadata } from "next";
import ConsultForm from "@/components/consult-form";
import { PageHead, Section } from "@/components/bits";
import { CONTACTS, REVIEWS, REVIEWS_SUMMARY, SOURCES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Отзывы и консультация",
  description:
    "Отзывы покупателей о застройщике ЖК «Уникум на Амирхана» и форма бесплатной консультации.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHead
        title="Отзывы и бесплатная консультация"
        lead="Дом ещё строится, поэтому отзывов жильцов пока нет. Ниже — что покупатели пишут об офисе продаж застройщика на 2ГИС, включая критику."
      />

      <Section title="Что пишут покупатели" className="pb-0 sm:pb-0">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="self-start rounded-2xl bg-cocoa p-6 text-paper">
            <p className="text-sm text-paper/85">Оценка на 2ГИС</p>
            <p className="tnum mt-1 font-display text-5xl font-medium">
              {REVIEWS_SUMMARY.rating.toLocaleString("ru-RU")}
              <span className="text-xl text-paper/80"> / 5</span>
            </p>
            <p className="tnum mt-4 text-sm text-paper/85">
              {REVIEWS_SUMMARY.ratings} оценки · {REVIEWS_SUMMARY.reviews} отзывов
            </p>
            <p className="mt-1 text-sm text-paper/85">Унистрой, офис продаж на ул. Николая Ершова, 62</p>
            <a
              href={SOURCES.reviews2gis}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
            >
              Читать все отзывы на 2ГИС
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <li key={r.author} className="flex flex-col rounded-2xl border border-line bg-card p-6">
                <span
                  className={`self-start rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.tone === "plus" ? "bg-lake-soft text-lake-deep" : "bg-warn/10 text-warn"
                  }`}
                >
                  {r.tone === "plus" ? "Положительный" : "Критический"}
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed">{r.text}</p>
                <p className="mt-5 text-sm font-medium">{r.author}</p>
                <p className="text-xs text-muted">2ГИС · {r.when}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-muted">
          Отзывы пересказаны кратко, без изменения смысла. Месяц указан по дате ответа компании.
          Полные тексты — в карточке организации на 2ГИС.
        </p>
      </Section>

      <Section
        id="konsultaciya"
        eyebrow="Бесплатная консультация"
        title="Расскажите, что вам нужно — менеджер перезвонит"
        lead="Подберём квартиру под бюджет, посчитаем ипотеку и запишем на экскурсию по дому."
      >
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <ConsultForm />
          <aside className="space-y-6 text-sm">
            <div>
              <h3 className="font-hand text-2xl font-semibold leading-tight">Или позвоните застройщику</h3>
              <p className="mt-2">
                <a href={CONTACTS.phoneHref} className="tnum text-xl font-medium hover:text-lake">
                  {CONTACTS.phone}
                </a>
              </p>
              <p className="tnum mt-1 text-muted">Консультации по покупке: {CONTACTS.consultPhone}</p>
            </div>
            <div>
              <h3 className="font-hand text-2xl font-semibold leading-tight">Офис продаж застройщика</h3>
              <p className="mt-2 text-muted">{CONTACTS.office}</p>
              <p className="mt-1 text-muted">{CONTACTS.hours}</p>
            </div>
            <div>
              <h3 className="font-hand text-2xl font-semibold leading-tight">Сообщества застройщика</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {CONTACTS.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-full border border-line bg-card px-4 py-2 hover:border-lake"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
