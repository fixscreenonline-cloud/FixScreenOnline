"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { FlagIcon } from "@/components/flag-icon";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher({
  compact = false,
  variant = "default",
}: {
  compact?: boolean;
  variant?: "default" | "light";
}) {
  const { locale, dict, setLocale } = useLanguage();

  const labels: Record<Locale, string> = {
    en: dict.language.english,
    es: dict.language.spanish,
  };

  const isLight = variant === "light";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          aria-label={dict.language.switchLabel}
          className={`min-w-0 gap-2 font-medium ${
            isLight
              ? "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              : "text-gray-700 border-gray-200"
          }`}
          size="sm"
          variant="bordered"
        >
          <FlagIcon locale={locale} />
          {!compact && (
            <span className="hidden sm:inline">{labels[locale]}</span>
          )}
          <span
            className={`uppercase text-xs ${isLight ? "text-white/90" : "sm:hidden"}`}
          >
            {locale}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={dict.language.switchLabel}
        selectedKeys={new Set([locale])}
        selectionMode="single"
        onAction={(key) => setLocale(key as Locale)}
      >
        <DropdownItem key="en" startContent={<FlagIcon locale="en" />}>
          {dict.language.english}
        </DropdownItem>
        <DropdownItem key="es" startContent={<FlagIcon locale="es" />}>
          {dict.language.spanish}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
