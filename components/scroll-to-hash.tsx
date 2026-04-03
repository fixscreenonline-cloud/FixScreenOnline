"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Smoothly scrolls to the URL hash after cross-page navigation.
 * CSS scroll-behavior only works for same-page anchor clicks; this
 * handles the case where you arrive on a page with a hash in the URL
 * (e.g. navigating from /pricing → /#about).
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    // Wait one frame for the page to fully paint before scrolling
    const raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
