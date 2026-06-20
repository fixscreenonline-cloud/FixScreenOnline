import type { ReactNode } from "react";

type PageSectionVariant = "default" | "muted" | "accent";

const variantClasses: Record<PageSectionVariant, string> = {
  default: "bg-white",
  muted: "bg-gray-50 border-y border-gray-100",
  accent:
    "bg-gradient-to-b from-violet-50/90 via-purple-50/40 to-white border-y border-violet-100/60",
};

interface PageSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  variant?: PageSectionVariant;
  className?: string;
  children: ReactNode;
}

export function PageSection({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "default",
  className = "",
  children,
}: PageSectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle);

  return (
    <section
      className={`relative w-full scroll-mt-24 py-12 sm:py-16 md:py-20 ${variantClasses[variant]} ${className}`}
      id={id}
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {hasHeader && (
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            {eyebrow && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
