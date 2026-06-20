"use client";

import { ArrowRight, Car, Store } from "lucide-react";

export interface ServiceChoiceCopy {
  onSiteTitle: string;
  onSiteDescription: string;
  inStoreTitle: string;
  inStoreDescription: string;
  popularBadge: string;
  bookNow: string;
}

interface ServiceChoiceSectionProps {
  copy: ServiceChoiceCopy;
  onSelect: (location: "store" | "come-to-me") => void;
  className?: string;
  compact?: boolean;
  selected?: "" | "store" | "come-to-me";
  selectMode?: boolean;
}

function ServiceChoiceCard({
  title,
  description,
  bookNow,
  icon: Icon,
  popularBadge,
  compact,
  selected,
  selectMode,
  onClick,
}: {
  title: string;
  description: string;
  bookNow: string;
  icon: typeof Car;
  popularBadge?: string;
  compact?: boolean;
  selected?: boolean;
  selectMode?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`group relative flex w-full flex-col items-start text-left transition-all duration-200 active:scale-[0.98] ${
        compact ? "gap-2 rounded-xl p-3 pt-3.5" : "gap-4 rounded-2xl p-5 sm:p-6"
      } ${
        selected
          ? "border-2 border-violet-600 bg-violet-50/50 shadow-md shadow-violet-500/10"
          : "border-2 border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/30 hover:shadow-md"
      }`}
      type="button"
      onClick={onClick}
    >
      {popularBadge && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 px-1.5 py-px text-[8px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[9px]">
          {popularBadge}
        </span>
      )}

      <div
        className={`flex items-center justify-center rounded-xl transition-colors ${
          compact ? "h-8 w-8" : "h-12 w-12"
        } ${
          selected
            ? "bg-violet-600 text-white"
            : "bg-gray-100 text-violet-600 group-hover:bg-violet-100"
        }`}
      >
        <Icon className={compact ? "h-3.5 w-3.5" : "h-6 w-6"} strokeWidth={2} />
      </div>

      <div className="space-y-0.5">
        <h3
          className={`font-bold ${compact ? "text-xs leading-snug sm:text-sm" : "text-base sm:text-lg"} ${
            selected ? "text-violet-700" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        {(selectMode || !compact) && (
          <p
            className={`leading-relaxed text-gray-500 ${compact ? "text-[10px] sm:text-xs" : "text-sm"}`}
          >
            {description}
          </p>
        )}
      </div>

      {!selectMode && (
        <span
          className={`mt-auto inline-flex items-center font-semibold text-violet-600 transition-colors group-hover:text-violet-700 ${
            compact ? "gap-1 text-xs" : "gap-1.5 text-sm"
          }`}
        >
          {bookNow}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </span>
      )}
    </button>
  );
}

export function ServiceChoiceSection({
  copy,
  onSelect,
  className = "",
  compact = false,
  selected = "",
  selectMode = false,
}: ServiceChoiceSectionProps) {
  return (
    <div className={`mx-auto w-full ${compact ? "" : "max-w-3xl"} ${className}`}>
      <div
        className={`grid pt-2 ${compact ? "grid-cols-2 gap-2" : "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"}`}
      >
        <ServiceChoiceCard
          bookNow={copy.bookNow}
          compact={compact}
          description={copy.onSiteDescription}
          icon={Car}
          popularBadge={copy.popularBadge}
          selectMode={selectMode}
          selected={selected === "come-to-me"}
          title={copy.onSiteTitle}
          onClick={() => onSelect("come-to-me")}
        />
        <ServiceChoiceCard
          bookNow={copy.bookNow}
          compact={compact}
          description={copy.inStoreDescription}
          icon={Store}
          selectMode={selectMode}
          selected={selected === "store"}
          title={copy.inStoreTitle}
          onClick={() => onSelect("store")}
        />
      </div>
    </div>
  );
}
