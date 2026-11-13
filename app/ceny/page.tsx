import Image from "next/image";
import type { Metadata } from "next";
import { Button, PageHead, Section, Source } from "@/components/bits";
import {
  DATA_DATE,
  ENGINEERING,
  FINISH,
  FLATS,
  PROJECT,
  ROOM_GROUPS,
  SERVICES,
  SOURCES,
  fmtPrice,
  type Flat,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Цены и услуги",
  description:
    "Цены на одно-, двух- и трёхкомнатные квартиры в ЖК «Уникум на Амирхана» с планировками, отделка и дополнительные услуги.",
};

const area = (n: number) => n.toLocaleString("ru-RU", { minimumFractionDigits: 2 });

function FlatCard({ flat }: { flat: Flat }) {
  const href = flat.id
    ? `https://unistroy.ru/search/placement/${flat.id}`
    : `${SOURCES.flats}&rooms=${flat.rooms}`;
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-card">
        {flat.plan ? (
          <Image
            src={flat.plan}
            alt={`Планировка: ${flat.rooms}-комнатная квартира ${area(flat.area)} м²`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4"
          />
        ) : (
          <p className="max-w-[16ch] text-center text-sm text-muted">
            Планировка — в карточке на сайте застройщика
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-line p-5">
        <p className="tnum text-xl font-medium">{fmtPrice(flat.price)}</p>
        <p className="tnum mt-1 text-sm text-muted">
          {area(flat.area)} м² · {fmtPrice(flat.price / flat.area)} за м²
        </p>
        <p className="tnum mt-3 text-sm">
          Этаж {flat.floor} из {PROJECT.floors} · секция {flat.section} · № {flat.num}
        </p>
        {flat.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {flat.tags.map((t) => (
              <li key={t} className="rounded-full bg-lake-soft px-2.5 py-1 text-xs text-lake-deep">
                {t}
              </li>
            ))}
          </ul>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 text-sm font-medium text-lake underline-offset-4 hover:underline"
        >
          Открыть у застройщика
        </a>
      </div>
    </li>
  );
}

export default function PricesPage() {
  return (
    <>
      <PageHead
        title="Цены и услуги"
        lead={`${PROJECT.flatsOnSale} квартир в продаже, цены от 11 млн ₽. Ниже — реальные лоты с планировками на ${DATA_DATE}; студий в продаже сейчас нет.`}
      />

      <nav aria-label="Типы квартир" className="mx-auto max-w-6xl px-4 pt-8">
        <ul className="flex flex-wrap gap-2 text-sm">
          {ROOM_GROUPS.map((g) => (
            <li key={g.anchor}>
              <a href={`#${g.anchor}`} className="block rounded-full border border-line bg-card px-4 py-2 hover:border-lake">
                {g.title} · {g.inSale}
              </a>
            </li>
          ))}
          <li>
            <a href="#otdelka" className="block rounded-full border border-line bg-card px-4 py-2 hover:border-lake">
              Отделка
            </a>
          </li>
          <li>
            <a href="#uslugi" className="block rounded-full border border-line bg-card px-4 py-2 hover:border-lake">
              Услуги
            </a>
          </li>
        </ul>
      </nav>

      {ROOM_GROUPS.map((g) => {
        const list = FLATS.filter((f) => f.rooms === g.rooms);
        const prices = list.map((f) => f.price);
        const areas = list.map((f) => f.area);
        return (
          <Section
            key={g.anchor}
            id={g.anchor}
            title={g.title}
            lead={`В продаже ${g.inSale}. В подборке — от ${area(Math.min(...areas))} до ${area(Math.max(...areas))} м², от ${fmtPrice(Math.min(...prices))}.`}
            className="pb-0 sm:pb-0"
          >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((f) => (
                <FlatCard key={`${f.section}-${f.num}`} flat={f} />
              ))}
            </ul>
          </Section>
        );
      })}

      <div className="mx-auto max-w-6xl px-4">
        <Source href={SOURCES.flats}>каталог квартир на unistroy.ru</Source>
        <p className="mt-2 text-xs text-muted">
          Цена одинакова при ипотеке, рассрочке и 100% оплате. Срок сдачи всех квартир — {PROJECT.deadline}.
        </p>
      </div>

      <Section
        id="otdelka"
        eyebrow="Отделка"
        title={FINISH.type}
        lead="Квартира передаётся подготовленной к финишному ремонту: черновые и «мокрые» работы уже сделаны, дизайн и материалы вы выбираете сами."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-hand text-2xl font-semibold leading-tight">Что обычно уже сделано</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {FINISH.usually.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lake" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">{FINISH.usuallySource}</p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-hand text-2xl font-semibold leading-tight">Что остаётся вам</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {FINISH.yours.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-3xl rounded-xl bg-lake-soft px-4 py-3 text-sm text-lake-deep">{FINISH.note}</p>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Услуг дизайнера интерьера, подбора мебели и ремонта «под ключ» для этого дома на сайте
          застройщика не заявлено. Спросите о них на консультации — если программа появится,
          менеджер расскажет условия.
        </p>
        <Source href={SOURCES.finishBlog}>блог Унистроя о видах отделки</Source>
      </Section>

      <Section
        id="inzheneriya"
        eyebrow="Инженерия дома"
        title="Вода, тепло, электрика и доступ"
        lead="То, что заложено в проект дома и не требует доплат."
        className="pt-0 sm:pt-0"
      >
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ENGINEERING.map((e) => (
            <li key={e.title} className="border-t border-ink pt-4">
              <h3 className="font-hand text-2xl font-semibold leading-tight">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
            </li>
          ))}
        </ul>
        <Source href={SOURCES.project}>unicum-amirhana.ru</Source>
      </Section>

      <Section
        id="uslugi"
        eyebrow="Дополнительные услуги"
        title="Что можно оформить вместе с квартирой"
        className="pt-0 sm:pt-0"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.title} className="flex flex-col rounded-2xl border border-line bg-card p-6">
              <h3 className="font-medium leading-snug">{s.title}</h3>
              <p className="tnum mt-2 text-lg font-medium text-lake">{s.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/otzyvy#konsultaciya">Получить консультацию</Button>
          <Button href="/ipoteka" variant="ghost">
            Рассчитать ипотеку
          </Button>
        </div>
      </Section>
    </>
  );
}
