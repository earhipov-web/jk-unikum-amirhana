const QUERY = "Казань, улица Фатыха Амирхана, ЖК Уникум на Амирхана";
const SRC = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(QUERY)}&z=15`;
const OPEN = `https://yandex.ru/maps/?text=${encodeURIComponent(QUERY)}`;

export default function YandexMap({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <iframe
          src={SRC}
          title="ЖК «Уникум на Амирхана» на Яндекс Картах"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="block h-[380px] w-full sm:h-[460px]"
        />
      </div>
      <figcaption className="mt-2 text-sm text-muted">
        Карта, фотографии и панорамы — Яндекс Карты.{" "}
        <a href={OPEN} target="_blank" rel="noopener noreferrer" className="text-lake underline">
          Открыть в Яндекс Картах
        </a>
      </figcaption>
    </figure>
  );
}
