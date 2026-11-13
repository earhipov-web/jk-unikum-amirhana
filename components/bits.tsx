import Link from "next/link";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl scroll-mt-28 px-4 py-14 sm:py-20", className)}>
      {eyebrow && <p className="mb-2 font-hand text-2xl font-semibold leading-none text-lake">{eyebrow}</p>}
      <h2 className="max-w-3xl font-display text-2xl font-medium leading-tight sm:text-3xl">{title}</h2>
      {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h1 className="max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
      </div>
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  const styles = {
    primary: "bg-sage text-ink hover:bg-sage-deep",
    ghost: "border border-ink/25 text-ink hover:border-ink",
    light: "bg-card text-ink hover:bg-lake-soft",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="mt-6 text-xs text-muted">
      Источник:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
        {children}
      </a>
    </p>
  );
}
