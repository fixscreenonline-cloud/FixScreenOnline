"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function AdminRootProviders({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      {...themeProps}
    >
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
