import type { Locale } from "@/lib/i18n/types";

function UsFlag({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      height="14"
      viewBox="0 0 24 16"
      width="21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#B22234" height="16" width="24" />
      <path
        d="M0 1.23H24M0 3.08H24M0 4.92H24M0 6.77H24M0 8.62H24M0 10.46H24M0 12.31H24M0 14.15H24"
        stroke="#FFF"
        strokeWidth="1.23"
      />
      <rect fill="#3C3B6E" height="8.62" width="9.6" />
      <g fill="#FFF">
        <circle cx="1.6" cy="1.4" r="0.55" />
        <circle cx="3.2" cy="1.4" r="0.55" />
        <circle cx="4.8" cy="1.4" r="0.55" />
        <circle cx="6.4" cy="1.4" r="0.55" />
        <circle cx="8" cy="1.4" r="0.55" />
        <circle cx="2.4" cy="2.6" r="0.55" />
        <circle cx="4" cy="2.6" r="0.55" />
        <circle cx="5.6" cy="2.6" r="0.55" />
        <circle cx="7.2" cy="2.6" r="0.55" />
        <circle cx="1.6" cy="3.8" r="0.55" />
        <circle cx="3.2" cy="3.8" r="0.55" />
        <circle cx="4.8" cy="3.8" r="0.55" />
        <circle cx="6.4" cy="3.8" r="0.55" />
        <circle cx="8" cy="3.8" r="0.55" />
        <circle cx="2.4" cy="5" r="0.55" />
        <circle cx="4" cy="5" r="0.55" />
        <circle cx="5.6" cy="5" r="0.55" />
        <circle cx="7.2" cy="5" r="0.55" />
        <circle cx="1.6" cy="6.2" r="0.55" />
        <circle cx="3.2" cy="6.2" r="0.55" />
        <circle cx="4.8" cy="6.2" r="0.55" />
        <circle cx="6.4" cy="6.2" r="0.55" />
        <circle cx="8" cy="6.2" r="0.55" />
      </g>
    </svg>
  );
}

function EsFlag({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      height="14"
      viewBox="0 0 24 16"
      width="21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#C60B1E" height="16" width="24" />
      <rect fill="#FFC400" height="8" width="24" y="4" />
      <rect fill="#C60B1E" height="1.2" width="24" y="6.8" opacity="0.15" />
    </svg>
  );
}

const FLAG_COMPONENTS: Record<Locale, typeof UsFlag> = {
  en: UsFlag,
  es: EsFlag,
};

export function FlagIcon({
  locale,
  className = "shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10",
}: {
  locale: Locale;
  className?: string;
}) {
  const FlagComponent = FLAG_COMPONENTS[locale];

  return <FlagComponent className={className} />;
}
