import type { ReactNode } from "react";
import { ShieldCheck, Wrench } from "lucide-react";

interface AdminAuthShellProps {
  children: ReactNode;
  description?: string;
  title: string;
}

export function AdminAuthShell({
  children,
  description = "Secure access to booking management",
  title,
}: AdminAuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/20" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-600/20" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30">
            <Wrench className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            FixScreen Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Device repair booking platform
          </p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-xl shadow-violet-500/10 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
