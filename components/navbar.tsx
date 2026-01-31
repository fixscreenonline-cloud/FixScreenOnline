import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="2xl" position="sticky" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity" href="/">
            <Logo />
            <p className="font-bold text-lg sm:text-xl text-gray-900">Apple Repair Pro</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 xl:gap-8 justify-start ml-auto">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className="text-gray-700 hover:text-violet-600 transition-colors duration-200 text-sm font-medium"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-white/95 backdrop-blur-lg pt-6 border-t border-gray-200">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                className="text-gray-700 hover:text-violet-600 transition-colors text-base font-medium w-full"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
