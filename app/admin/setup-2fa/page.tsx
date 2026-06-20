"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AdminAuthShell } from "@/components/admin/auth-shell";

const inputClassName =
  "flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export default function SetupTwoFactorPage() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSetup() {
      const res = await fetch("/api/admin/auth/setup-2fa");

      if (!res.ok) {
        router.push("/admin/login");

        return;
      }

      const data = await res.json();

      setSecret(data.secret);
      setQrCode(data.qrCode);
    }

    loadSetup();
  }, [router]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/setup-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Setup failed");

        return;
      }

      setRecoveryCodes(data.recoveryCodes ?? []);
      toast.success("Two-factor authentication enabled");
    } catch {
      setError("Setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyRecoveryCodes() {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    toast.success("Recovery codes copied");
  }

  if (recoveryCodes.length > 0) {
    return (
      <AdminAuthShell
        description="Store these codes securely. Each can be used once."
        title="Save Your Recovery Codes"
      >
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-violet-50 p-4 font-mono text-sm dark:bg-zinc-950">
          {recoveryCodes.map((code) => (
            <div key={code}>{code}</div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-gray-200"
            type="button"
            onClick={copyRecoveryCodes}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Codes
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 text-sm font-semibold text-white shadow-md shadow-violet-500/25"
            type="button"
            onClick={() => router.push("/admin")}
          >
            Go to Dashboard
          </button>
        </div>
      </AdminAuthShell>
    );
  }

  return (
    <AdminAuthShell
      description="Scan the QR code with Google Authenticator, Microsoft Authenticator, or Authy"
      title="Set Up Two-Factor Authentication"
    >
      <div className="space-y-4">
        {qrCode && (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="2FA QR Code"
              className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm dark:border-zinc-700"
              height={200}
              src={qrCode}
              width={200}
            />
          </div>
        )}

        {secret && (
          <div className="rounded-lg bg-violet-50 p-3 text-center dark:bg-zinc-950">
            <p className="text-xs text-gray-500">Manual entry key</p>
            <p className="break-all font-mono text-sm text-gray-900 dark:text-white">
              {secret}
            </p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleConfirm}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="token"
            >
              Enter code from app
            </label>
            <input
              required
              className={`${inputClassName} text-center text-lg tracking-[0.3em]`}
              id="token"
              inputMode="numeric"
              maxLength={8}
              placeholder="000000"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          <button
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-semibold text-white shadow-md shadow-violet-500/25 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Enabling 2FA..." : "Enable 2FA & Continue"}
          </button>
        </form>
      </div>
    </AdminAuthShell>
  );
}
