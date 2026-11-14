import type { Metadata } from "next";
import MortgageCalc from "@/components/mortgage-calc";
import { Button, PageHead, Section, Source } from "@/components/bits";
import { MORTGAGE_PROGRAMS, PAY_WAYS, SOURCES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ипотека и способы покупки",
  description:
    "Ипотечные программы, рассрочка, трейд-ин и калькулятор платежа для квартир в ЖК «Уникум на Амирхана».",
};

export default function MortgagePage() {
  return (
    <>
      <PageHead
        title="Ипотека и способы покупки"
        lead="Ставки от 4,4% по IT-ипотеке и от 6% по семейной. Подвигайте ползунки — платёж пересчитается сразу."
      />

      <Section title="Калькулятор ипотеки" className="pb-0 sm:pb-0">
        <MortgageCalc />
      </Section>

      <Section
        title="Программы"
        lead="Ставки из действующих предложений застройщика и банков-партнёров. Одобрение и итоговую ставку определяет банк."
        className="pb-0 sm:pb-0"
      >
        <div className="overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-line text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-normal">Программа</th>
                <th scope="col" className="px-5 py-3 font-normal">Ставка</th>
                <th scope="col" className="px-5 py-3 font-normal">Первый взнос</th>
                <th scope="col" className="px-5 py-3 font-normal">Срок</th>
              </tr>
            </thead>
            <tbody>
              {MORTGAGE_PROGRAMS.map((p) => (
                <tr key={p.name} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium">{p.name}</th>
                  <td className="tnum px-5 py-4">от {p.rate.toLocaleString("ru-RU")}%</td>
                  <td className="tnum px-5 py-4">{p.down}</td>
                  <td className="px-5 py-4">{p.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">
          Полная стоимость кредита: семейная ипотека — от 16,650% до 23,603% (ВТБ); ипотека от 13% —
          от 13,325% до 24,812% (Сбер); ипотека от 13,89% — от 13,89% до 24,938% (Альфа-Банк).
          Для заёмщиков без официального дохода минимальный взнос — 50,1%. Программы действуют до
          31 декабря 2026 года.
        </p>
        <Source href={SOURCES.mortgage}>unistroy.ru/oplata/ipoteka и раздел акций</Source>
      </Section>

      <Section title="Шесть способов оплаты">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {PAY_WAYS.map((w) => (
            <li key={w.title} className="rounded-xl border border-line bg-card p-3.5 sm:rounded-2xl sm:p-6">
              <h3 className="font-hand text-xl font-semibold leading-tight sm:text-2xl">{w.title}</h3>
              <p className="mt-1.5 text-xs leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">{w.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 sm:mt-10">
          <Button href="/otzyvy#konsultaciya">Подобрать программу с менеджером</Button>
        </div>
      </Section>
    </>
  );
}
