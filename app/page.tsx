import Image from "next/image";
import Link from "next/link";
import FeaturedSectionStats from "@/components/ui/featured-section-stats";
import YandexMap from "@/components/yandex-map";
import { Button, Section, Source } from "@/components/bits";
import {
  DEVELOPER,
  FEATURES,
  IMAGES,
  PROJECT,
  PROMOS,
  ROOM_GROUPS,
  FLATS,
  SOURCES,
  fmtMln,
} from "@/lib/data";

const facts = [
  { value: `от ${fmtMln(PROJECT.priceFrom)}`, label: "цена квартиры" },
  { value: PROJECT.deadline, label: "срок сдачи" },
  { value: `${PROJECT.readiness}%`, label: "готовность дома" },
  { value: `${PROJECT.flatsOnSale}`, label: "квартир в продаже" },
];

const sections = [
  { href: "/ceny", title: "Цены и услуги", text: "Квартиры с планировками, отделка, паркинг и кладовые." },
  { href: "/ipoteka", title: "Ипотека", text: "Программы, способы покупки и калькулятор платежа." },
  { href: "/raspolozhenie", title: "Расположение", text: "Что рядом, сколько идти и как идёт стройка." },
  { href: "/otzyvy", title: "Отзывы и консультация", text: "Что пишут покупатели и форма бесплатной заявки." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cocoa text-card">
        <Image
          src={IMAGES.hero}
          alt="ЖК «Уникум на Амирхана» в Казани"
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#3d2c21]/90 via-[#3d2c21]/50 to-[#3d2c21]/20" />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-10 pt-32">
          <p className="text-xs uppercase tracking-[0.14em] text-card/90">
            {PROJECT.city} · Ново-Савиновский район · {PROJECT.klass}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] sm:text-6xl">
            Уникум на&nbsp;Амирхана
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-card/90 sm:text-lg">
            {PROJECT.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ceny">Выбрать квартиру</Button>
            <Button href="/otzyvy#konsultaciya" variant="light">
              Получить консультацию
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-card/30 pt-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dd className="tnum text-xl font-medium sm:text-2xl">{f.value}</dd>
                <dt className="mt-1 text-sm text-card/85">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section
        id="akcii"
        eyebrow="Акции"
        title="Шесть способов купить выгоднее"
        lead="Действующие предложения застройщика для этого проекта. Программы можно сочетать — уточните у менеджера, какие суммируются для вашей квартиры."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROMOS.map((p) => (
            <li key={p.title} className="flex flex-col rounded-2xl border border-line bg-card p-6">
              <span className="self-start rounded-full bg-lake-soft px-2.5 py-1 text-xs font-medium text-lake-deep">
                {p.tag}
              </span>
              <h3 className="mt-4 text-lg font-medium leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
              <p className="mt-4 text-xs text-muted">{p.until}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm font-medium text-lake underline-offset-4 hover:underline"
              >
                Условия у застройщика
              </a>
            </li>
          ))}
        </ul>
        <Source href={SOURCES.actions}>акции на unistroy.ru</Source>
      </Section>

      <Section
        id="kvartiry"
        eyebrow="Квартиры"
        title="Одно-, двух- и трёхкомнатные, 38 планировок"
        className="pt-0 sm:pt-0"
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {ROOM_GROUPS.map((g) => {
            const list = FLATS.filter((f) => f.rooms === g.rooms);
            const min = list.reduce((a, b) => (a.price < b.price ? a : b));
            return (
              <li key={g.rooms}>
                <Link
                  href={`/ceny#${g.anchor}`}
                  className="group block rounded-2xl border border-line bg-card p-6 transition-colors hover:border-lake"
                >
                  <p className="text-sm text-muted">{g.inSale} в продаже</p>
                  <h3 className="mt-1 text-xl font-medium">{g.title}</h3>
                  <p className="tnum mt-6 text-2xl font-medium">от {fmtMln(min.price)}</p>
                  <p className="tnum mt-1 text-sm text-muted">
                    от {min.area.toLocaleString("ru-RU")} м²
                  </p>
                  <p className="mt-6 text-sm font-medium text-lake group-hover:underline">
                    Смотреть планировки
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        id="o-proekte"
        eyebrow="О проекте"
        title="Дом, в котором двор принадлежит людям"
        lead="17 этажей, закрытый двор на стилобате и паркинг, в который спускаются на лифте. Из окон — Малое Чайковое озеро и парк."
        className="pt-0 sm:pt-0"
      >
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li key={f.title} className="border-t border-ink pt-4">
              <h3 className="font-hand text-2xl font-semibold leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="foto"
        eyebrow="Фотографии и карта"
        title="Как выглядит дом и где он стоит"
        className="pt-0 sm:pt-0"
      >
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {IMAGES.gallery.map((img) => (
            <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 380px, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-muted">Визуализации застройщика. Дом строится, сдача — {PROJECT.deadline}.</p>
        <YandexMap className="mt-8" />
      </Section>

      <div className="border-y border-line bg-card">
        <FeaturedSectionStats />
      </div>

      <Section
        id="zastrojshchik"
        eyebrow="Застройщик"
        title={`${DEVELOPER.name}: строит с ${DEVELOPER.since} года`}
        lead={DEVELOPER.text}
      >
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {DEVELOPER.stats.map((s) => (
            <div key={s.label} className="border-t border-ink pt-4">
              <dd className="tnum text-2xl font-medium sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
          {DEVELOPER.awards.map((a) => (
            <li key={a} className="rounded-xl bg-lake-soft px-4 py-3 text-lake-deep">
              {a}
            </li>
          ))}
        </ul>
        <Source href={SOURCES.about}>unistroy.ru/about</Source>
      </Section>

      <Section title="Куда дальше" className="pt-0 sm:pt-0">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`block h-full rounded-2xl p-6 text-ink transition-colors ${
                  i % 2 === 0 ? "bg-lake-soft hover:bg-sage" : "bg-blush hover:bg-blush-deep"
                }`}
              >
                <h3 className="font-hand text-2xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{s.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
