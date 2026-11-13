"use client";

import { useId, useState } from "react";
import { MORTGAGE_PROGRAMS, PROJECT, fmtPrice } from "@/lib/data";

const clamp = (n: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;

export default function MortgageCalc() {
  const id = useId();
  const [price, setPrice] = useState(PROJECT.priceFrom);
  const [downPct, setDownPct] = useState(20.1);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(13);

  const down = (price * downPct) / 100;
  const loan = price - down;
  const m = rate / 100 / 12;
  const n = years * 12;
  const payment = m === 0 ? loan / n : (loan * m) / (1 - Math.pow(1 + m, -n));

  const field = "mt-2 w-full accent-[var(--lake)]";

  return (
    <div className="grid gap-6 rounded-2xl border border-line bg-card p-6 lg:grid-cols-[1.4fr_1fr] lg:p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor={`${id}-price`} className="flex justify-between text-sm">
            <span>Стоимость квартиры</span>
            <span className="tnum font-medium">{fmtPrice(price)}</span>
          </label>
          <input
            id={`${id}-price`}
            type="range"
            min={11_000_000}
            max={27_500_000}
            step={10_000}
            value={price}
            onChange={(e) => setPrice(clamp(Number(e.target.value), 11_000_000, 27_500_000))}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-down`} className="flex justify-between text-sm">
            <span>Первый взнос</span>
            <span className="tnum font-medium">
              {downPct.toLocaleString("ru-RU")}% · {fmtPrice(down)}
            </span>
          </label>
          <input
            id={`${id}-down`}
            type="range"
            min={20.1}
            max={90}
            step={0.1}
            value={downPct}
            onChange={(e) => setDownPct(clamp(Number(e.target.value), 20.1, 90))}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-years`} className="flex justify-between text-sm">
            <span>Срок</span>
            <span className="tnum font-medium">{years} лет</span>
          </label>
          <input
            id={`${id}-years`}
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(clamp(Number(e.target.value), 5, 30))}
            className={field}
          />
        </div>
        <fieldset>
          <legend className="text-sm">Программа</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {MORTGAGE_PROGRAMS.map((p) => (
              <button
                key={p.name}
                type="button"
                aria-pressed={rate === p.rate}
                onClick={() => setRate(p.rate)}
                className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
                  rate === p.rate
                    ? "border-ink bg-cocoa text-paper"
                    : "border-line hover:border-lake"
                }`}
              >
                {p.name} · {p.rate.toLocaleString("ru-RU")}%
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between rounded-xl bg-lake-soft p-6" aria-live="polite">
        <div>
          <p className="text-sm text-lake-deep">Платёж в месяц</p>
          <p className="tnum mt-1 text-3xl font-medium text-lake-deep sm:text-4xl">
            {fmtPrice(payment)}
          </p>
          <dl className="mt-6 space-y-2 text-sm text-lake-deep">
            <div className="flex justify-between gap-4">
              <dt>Сумма кредита</dt>
              <dd className="tnum font-medium">{fmtPrice(loan)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Ставка</dt>
              <dd className="tnum font-medium">{rate.toLocaleString("ru-RU")}%</dd>
            </div>
          </dl>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-lake-deep/80">
          Расчёт предварительный, по формуле аннуитетного платежа. Не учитывает страховки и
          полную стоимость кредита. Точные условия даёт банк.
        </p>
      </div>
    </div>
  );
}
