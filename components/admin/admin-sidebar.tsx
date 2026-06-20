"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { fetchCsrfToken } from "@/lib/admin/api-client";
import { cn } from "@/lib/utils";
import { AdminThemeToggle } from "@/components/admin/theme-toggle";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, shortLabel: "Home" },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays, shortLabel: "Bookings" },
  { href: "/admin/settings", label: "Settings", icon: Settings, shortLabel: "Settings" },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentPage =
    navItems.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href),
    )?.label ?? "Admin";

  async function handleLogout() {
    await fetchCsrfToken();
    await fetch("/api/admin/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token":
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("admin_csrf="))
            ?.split("=")[1] ?? "",
      },
    });
    window.location.href = "/admin/login";
  }

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-border/60 bg-background/95 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <Button
          aria-label="Open menu"
          className="h-9 w-9 shrink-0"
          size="icon"
          variant="ghost"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{currentPage}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            FixScreen Admin
          </p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600">
          <Wrench className="h-4 w-4" />
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "flex min-w-[4.5rem] flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-medium transition-colors",
                  active
                    ? "text-violet-600"
                    : "text-muted-foreground active:bg-muted/60",
                )}
                href={item.href}
              >
                <Icon
                  className={cn("h-5 w-5", active && "stroke-[2.5px]")}
                  strokeWidth={active ? 2.5 : 2}
                />
                {item.shortLabel}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2 border-b px-6 py-5">
          <Wrench className="h-5 w-5 text-violet-600" />
          <div className="min-w-0">
            <p className="text-sm font-bold">FixScreen Admin</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-500/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                href={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t p-4">
          <AdminThemeToggle />
          <Button
            className="w-full justify-start"
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile drawer (account + settings) */}
      {drawerOpen && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            type="button"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-[70] flex w-[min(85vw,18rem)] flex-col border-r bg-background shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-violet-600" />
                <span className="font-semibold">Menu</span>
              </div>
              <Button
                aria-label="Close"
                size="icon"
                variant="ghost"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-b px-4 py-3">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="truncate text-sm font-medium">{email}</p>
            </div>

            <nav className="flex-1 space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                      active
                        ? "bg-violet-600 text-white"
                        : "text-foreground active:bg-muted",
                    )}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-2 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <AdminThemeToggle />
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export function AdminHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 hidden lg:mb-6 lg:block">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-0.5 text-sm text-muted-foreground">
        Device repair booking management
      </p>
    </div>
  );
}
