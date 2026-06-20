"use client";

import { CSRF_HEADER } from "@/lib/auth/csrf-constants";

let csrfToken: string | null = null;

export async function fetchCsrfToken() {
  const res = await fetch("/api/admin/csrf");

  if (res.ok) {
    const data = await res.json();

    csrfToken = data.csrfToken;
  }

  return csrfToken;
}

export async function adminFetch(
  url: string,
  options: RequestInit = {},
) {
  if (!csrfToken) {
    await fetchCsrfToken();
  }

  const headers = new Headers(options.headers);

  if (csrfToken && options.method && options.method !== "GET") {
    headers.set(CSRF_HEADER, csrfToken);
  }

  headers.set("Content-Type", "application/json");

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 && !url.includes("/auth/")) {
    window.location.href = "/admin/login";
  }

  return response;
}

export function setCsrfToken(token: string) {
  csrfToken = token;
}
