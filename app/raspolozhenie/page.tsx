import type { Metadata } from "next";
import YandexMap from "@/components/yandex-map";
import { Button, PageHead, Section, Source } from "@/components/bits";
import { CONSTRUCTION, DATA_DATE, NEARBY, PROJECT, SOURCES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Расположение и ход строительства",
  description:
    "Где находится ЖК «Уникум на Амирхана», что рядом и на какой стадии строительство.",
};

export default function LocationPage() {
  return (
    <>
      <PageHead
        title="Расположение и ход строительства"
        lead="Центр Ново-Савиновского района: три минуты до парка у Малого Чайкового озера, рядом проспект Ямашева и улица Чистопольская, около десяти минут до центра города."
      />

      <Section title="На карте" lead={`${PROJECT.city}, ${PROJECT.address}.`} className="pb-0 sm:pb-0">
        <YandexMap />
      </Section>

      <Section
        title="Что рядом"
        lead="Время в пути — по данным застройщика."
        className="pb-0 sm:pb-0"
      >
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {NEARBY.map((g) => (
            <div key={g.group} className="rounded-xl border border-line bg-card p-4 sm:rounded-2xl sm:p-6">
              <h3 className="font-hand text-xl font-semibold leading-tight sm:text-2xl">{g.group}</h3>
              <ul className="mt-2.5 space-y-2 text-sm sm:mt-4 sm:space-y-3">
                {g.items.map(([name, min]) => (
                  <li key={name} className="flex items-baseline justify-between gap-3">
                    <span>{name}</span>
                    <span className="tnum whitespace-nowrap text-muted">{min} мин</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Source href={SOURCES.developer}>страница проекта на unistroy.ru</Source>
      </Section>

      <Section
        id="stroitelstvo"
        title="Ход строительства"
        lead={`Состояние на ${DATA_DATE}. Срок сдачи — ${PROJECT.deadline}.`}
      >
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-xl bg-cocoa p-4 text-paper sm:rounded-2xl sm:p-6">
            <p className="text-sm text-paper/85">Готовность проекта</p>
            <p className="tnum mt-1 font-display text-4xl font-medium sm:text-5xl">{PROJECT.readiness}%</p>
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-paper/20 sm:mt-6"
              role="progressbar"
              aria-valuenow={PROJECT.readiness}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Готовность проекта"
            >
              <div className="h-full rounded-full bg-sage" style={{ width: `${PROJECT.readiness}%` }} />
            </div>
          </div>
          <ol className="space-y-2 sm:space-y-3">
            {CONSTRUCTION.map((c, i) => (
              <li key={c} className="flex gap-3 rounded-xl border border-line bg-card p-3.5 text-sm sm:gap-4 sm:rounded-2xl sm:p-5 sm:text-base">
                <span className="tnum font-display text-lake">0{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Строительство ведётся по 214-ФЗ: деньги покупателей хранятся на эскроу-счетах до сдачи
          дома. Застройщик — {PROJECT.legal}.
        </p>
        <div className="mt-6 sm:mt-8">
          <Button href="/otzyvy#konsultaciya">Записаться на экскурсию</Button>
        </div>
      </Section>
    </>
  );
}
