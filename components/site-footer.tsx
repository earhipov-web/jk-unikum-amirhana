import Link from "next/link";
import { CONTACTS, DATA_DATE, NAV, PROJECT, SOURCES } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-cocoa text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-base">Уникум на Амирхана</p>
          <p className="mt-3 text-sm text-paper/85">
            {PROJECT.city}, {PROJECT.address}. Срок сдачи — {PROJECT.deadline}.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Разделы</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/85">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Офис продаж</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/85">
            <li>
              <a href={CONTACTS.phoneHref} className="tnum hover:text-paper">
                {CONTACTS.phone}
              </a>
            </li>
            <li>{CONTACTS.office}</li>
            <li>{CONTACTS.hours}</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Сообщества застройщика</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/85">
            {CONTACTS.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs leading-relaxed text-paper/80">
          <p>
            Это информационный сайт о жилом комплексе, а не официальный сайт застройщика. Данные
            собраны из открытых источников {DATA_DATE} и могут измениться. Предложение не является
            публичной офертой. Актуальные цены и условия — на{" "}
            <a href={SOURCES.developer} target="_blank" rel="noopener noreferrer" className="underline hover:text-paper">
              unistroy.ru
            </a>
            .
          </p>
          <p>
            Застройщик: {PROJECT.legal}. Проектная декларация — в ЕИСЖС на наш.дом.рф. Изображения и
            планировки принадлежат застройщику.
          </p>
        </div>
      </div>
    </footer>
  );
}
