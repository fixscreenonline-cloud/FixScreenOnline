"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

import { AdminAuthShell } from "@/components/admin/auth-shell";

export default function AdminTwoFactorPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [useRecovery, setUseRecovery] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          useRecovery ? { recoveryCode } : { token },
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");

        return;
      }

      router.push(data.redirect || "/admin");
      router.refresh();
    } catch {
      setError("Unable to verify. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

  return (
    <AdminAuthShell
      description="Enter the 6-digit code from your authenticator app"
      title="Two-Factor Authentication"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {!useRecovery ? (
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="token"
            >
              Authenticator Code
            </label>
            <input
              required
              autoComplete="one-time-code"
              className={`${inputClassName} text-center text-lg tracking-[0.3em]`}
              id="token"
              inputMode="numeric"
              maxLength={8}
              placeholder="000000"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="recovery"
            >
              Recovery Code
            </label>
            <input
              required
              className={`${inputClassName} font-mono uppercase`}
              id="recovery"
              placeholder="XXXX-XXXX"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
            />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:from-violet-700 hover:to-purple-700 disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Verifying..." : "Verify & Sign In"}
        </button>

        <button
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-violet-700 transition hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-500/10"
          type="button"
          onClick={() => setUseRecovery(!useRecovery)}
        >
          <KeyRound className="h-4 w-4" />
          {useRecovery ? "Use authenticator app" : "Use recovery code"}
        </button>
      </form>
    </AdminAuthShell>
  );
}
