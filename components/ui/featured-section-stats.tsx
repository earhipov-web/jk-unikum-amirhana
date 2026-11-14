"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// Демо-данные: цифры в этом блоке произвольные и не относятся к реальной статистике ЖК.
const data = [
  { name: "Май", value: 34 },
  { name: "Июн", value: 41 },
  { name: "Июл", value: 48 },
  { name: "Авг", value: 57 },
  { name: "Сен", value: 69 },
  { name: "Окт", value: 84 },
  { name: "Ноя", value: 96 },
];

const stats = [
  { value: "1 240+", label: "заявок на просмотр" },
  { value: "96", label: "броней за ноябрь" },
  { value: "4,8", label: "средняя оценка экскурсии" },
  { value: "15 мин", label: "среднее время ответа" },
];

export default function FeaturedSectionStats() {
  return (
    <section className="mx-auto w-full max-w-6xl py-10 text-left sm:py-28">
      <div className="px-4">
        <p className="mb-4 inline-block rounded-full border border-line px-3 py-1 text-xs text-muted">
          Демо-дашборд · данные условные
        </p>
        <h3 className="mb-6 text-lg font-medium text-ink sm:mb-12 sm:text-xl lg:text-4xl">
          Интерес к проекту в цифрах.{" "}
          <span className="text-sm text-muted sm:text-base lg:text-4xl">
            Следим за спросом в реальном времени: сколько людей записываются на экскурсии,
            бронируют квартиры и как быстро им отвечают менеджеры.
          </span>
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="tnum text-2xl font-medium text-ink sm:text-3xl">{s.value}</p>
              <p className="text-sm text-muted sm:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-5 h-36 w-full sm:mt-8 sm:h-56"
        role="img"
        aria-label="График: число броней по месяцам, с 34 в мае до 96 в ноябре (условные данные)"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 16 }}>
            <defs>
              <linearGradient id="statsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5f8b72" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#5f8b72" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#735e4e", fontSize: 12 }}
            />
            <Tooltip
              formatter={(v) => [`${v}`, "Броней"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #e0d2bf", fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5f8b72"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#statsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
