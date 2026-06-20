"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { LanguageSwitcher } from "@/components/locale-switcher";
import { resolveQuoteHash } from "@/components/service-quote-block";
import { useLanguage } from "@/lib/i18n/language-provider";

function useSmoothNav() {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only intercept section links (/#something)
      if (!href.startsWith("/#")) return;

      let hash = href.slice(1); // strip leading /

      if (hash === "quote") {
        hash = resolveQuoteHash().slice(1);
      }

      if (pathname === "/") {
        // Already on home — scroll smoothly without navigation
        e.preventDefault();
        const el = document.querySelector(`#${hash}`);

        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // On another page — navigate to / and let ScrollToHash handle the scroll
        e.preventDefault();
        router.push(`/#${hash}`);
      }
    },
    [pathname, router],
  );
}

export const Navbar = () => {
  const handleNav = useSmoothNav();
  const { dict } = useLanguage();

  return (
    <HeroUINavbar
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity"
            href="/"
          >
            <p className="font-bold text-lg sm:text-xl text-gray-900">
              {dict.nav.brand}
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 xl:gap-6 justify-start ml-auto">
          {dict.nav.items.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className="text-gray-700 hover:text-violet-600 transition-colors duration-200 text-sm font-medium"
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex basis-1 pl-4 gap-3" justify="end">
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <NextLink
            className="inline-flex items-center justify-center font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm shadow-md shadow-violet-500/30 hover:shadow-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
            href="/#quote"
            onClick={(e) => handleNav(e, "/#quote")}
          >
            {dict.nav.getFreeQuote}
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4 gap-2" justify="end">
        <NavbarItem className="flex">
          <LanguageSwitcher compact />
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-white/95 backdrop-blur-lg pt-4 border-t border-gray-200">
        <div className="mx-4 mt-2 flex flex-col gap-3">
          {dict.nav.menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NextLink
                className="text-gray-700 hover:text-violet-600 transition-colors text-base font-medium w-full"
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <div className="py-1">
              <LanguageSwitcher compact />
            </div>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink
              className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-base shadow-md w-full mt-2"
              href="/#quote"
              onClick={(e) => handleNav(e, "/#quote")}
            >
              {dict.nav.getFreeQuote}
            </NextLink>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
