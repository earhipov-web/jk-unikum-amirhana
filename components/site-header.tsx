"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACTS, NAV } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-sm font-medium tracking-tight sm:text-base">
          Уникум <span className="text-lake">на Амирхана</span>
        </Link>
        <a
          href={CONTACTS.phoneHref}
          className="tnum whitespace-nowrap text-sm font-medium hover:text-lake"
        >
          {CONTACTS.phone}
        </a>
      </div>
      <nav aria-label="Разделы сайта" className="mx-auto max-w-6xl overflow-x-auto px-4">
        <ul className="flex gap-1 pb-2 text-sm">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
                    active ? "bg-cocoa text-paper" : "text-muted hover:bg-lake-soft hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
