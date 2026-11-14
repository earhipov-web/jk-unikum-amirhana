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
        <div className="mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-end px-4 pb-7 pt-20 sm:min-h-[78vh] sm:pb-10 sm:pt-32">
          <p className="text-xs uppercase tracking-[0.14em] text-card/90">
            {PROJECT.city} · Ново-Савиновский район · {PROJECT.klass}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] sm:text-6xl">
            Уникум на&nbsp;Амирхана
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-card/90 sm:mt-5 sm:text-lg">
            {PROJECT.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <Button href="/ceny">Выбрать квартиру</Button>
            <Button href="/otzyvy#konsultaciya" variant="light">
              Получить консультацию
            </Button>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-card/30 pt-4 sm:mt-12 sm:grid-cols-4 sm:gap-y-5 sm:pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dd className="tnum text-lg font-medium sm:text-2xl">{f.value}</dd>
                <dt className="mt-0.5 text-xs text-card/85 sm:mt-1 sm:text-sm">{f.label}</dt>
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
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {PROMOS.map((p) => (
            <li key={p.title} className="flex flex-col rounded-xl border border-line bg-card p-3.5 sm:rounded-2xl sm:p-6">
              <span className="self-start rounded-full bg-lake-soft px-2 py-0.5 text-[11px] font-medium text-lake-deep sm:px-2.5 sm:py-1 sm:text-xs">
                {p.tag}
              </span>
              <h3 className="mt-2.5 text-[15px] font-medium leading-snug sm:mt-4 sm:text-lg">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">{p.text}</p>
              <p className="mt-2.5 text-[11px] text-muted sm:mt-4 sm:text-xs">{p.until}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 py-1 text-xs font-medium text-lake underline-offset-4 hover:underline sm:mt-3 sm:py-0 sm:text-sm"
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
        {/* На телефоне — компактные строки «тип слева, цена справа», с 640px — карточки */}
        <ul className="grid gap-2.5 sm:grid-cols-3 sm:gap-4">
          {ROOM_GROUPS.map((g) => {
            const list = FLATS.filter((f) => f.rooms === g.rooms);
            const min = list.reduce((a, b) => (a.price < b.price ? a : b));
            return (
              <li key={g.rooms}>
                <Link
                  href={`/ceny#${g.anchor}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-lake sm:block sm:rounded-2xl sm:p-6"
                >
                  <div>
                    <h3 className="text-base font-medium sm:text-xl">{g.title}</h3>
                    <p className="text-xs text-muted sm:mt-1 sm:text-sm">{g.inSale} в продаже</p>
                  </div>
                  <div className="text-right sm:text-left">
                    <p className="tnum text-base font-medium sm:mt-6 sm:text-2xl">
                      от {fmtMln(min.price)}
                    </p>
                    <p className="tnum text-xs text-muted sm:mt-1 sm:text-sm">
                      от {min.area.toLocaleString("ru-RU")} м²
                    </p>
                  </div>
                  <p className="hidden text-sm font-medium text-lake group-hover:underline sm:mt-6 sm:block">
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
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li key={f.title} className="border-t border-ink pt-3 sm:pt-4">
              <h3 className="font-hand text-xl font-semibold leading-tight sm:text-2xl">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">{f.text}</p>
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
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {IMAGES.gallery.map((img) => (
            <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-line sm:rounded-2xl">
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
        <YandexMap className="mt-5 sm:mt-8" />
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
        <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {DEVELOPER.stats.map((s) => (
            <div key={s.label} className="border-t border-ink pt-3 sm:pt-4">
              <dd className="tnum text-xl font-medium sm:text-3xl">{s.value}</dd>
              <dt className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
        <ul className="mt-6 grid grid-cols-2 gap-2 text-xs sm:mt-10 sm:gap-3 sm:text-sm">
          {DEVELOPER.awards.map((a) => (
            <li key={a} className="rounded-xl bg-lake-soft px-3 py-2.5 text-lake-deep sm:px-4 sm:py-3">
              {a}
            </li>
          ))}
        </ul>
        <Source href={SOURCES.about}>unistroy.ru/about</Source>
      </Section>

      <Section title="Куда дальше" className="pt-0 sm:pt-0">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {sections.map((s, i) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`block h-full rounded-xl p-4 text-ink transition-colors sm:rounded-2xl sm:p-6 ${
                  i % 2 === 0 ? "bg-lake-soft hover:bg-sage" : "bg-blush hover:bg-blush-deep"
                }`}
              >
                <h3 className="font-hand text-xl font-semibold leading-tight sm:text-2xl">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-snug sm:mt-2 sm:text-sm sm:leading-relaxed">{s.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
