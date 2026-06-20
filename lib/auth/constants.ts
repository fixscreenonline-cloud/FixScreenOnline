export const MAX_FAILED_ATTEMPTS = 3;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const PENDING_AUTH_TTL_MS = 5 * 60 * 1000;
export const ONE_TIME_TOKEN_TTL_MS = 60 * 1000;
export const RECOVERY_CODE_COUNT = 10;
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 10;

export const DEVICE_TYPES = [
  "laptop",
  "smartphone",
  "tablet",
  "desktop",
  "smartwatch",
  "smart-glass",
  "other",
] as const;

export const SERVICE_LOCATIONS = ["store", "come-to-me"] as const;

export const TIME_SLOTS = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 8;

  return [0, 30].map((minute) => {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  });
}).flat();
