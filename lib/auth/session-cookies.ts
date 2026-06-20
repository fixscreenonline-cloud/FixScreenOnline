import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";

export async function setSessionCookie(
  sessionToken: string,
  expiresAt: Date,
) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE)?.value;
}

export const PENDING_COOKIE = "admin_pending";

export async function setPendingCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(PENDING_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 5 * 60,
  });
}

export async function getPendingToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(PENDING_COOKIE)?.value;
}

export async function clearPendingCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(PENDING_COOKIE);
}
