import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_CLASSNAMES: Record<Variant, string> = {
  primary:
    "bg-white text-neutral-900 hover:bg-neutral-200 focus-visible:ring-white/70",
  secondary:
    "border border-neutral-700 text-neutral-100 hover:border-neutral-500 focus-visible:ring-neutral-400/60",
  ghost:
    "text-neutral-200 hover:text-neutral-50 focus-visible:ring-neutral-300/60",
};

/**
 * Temporary shared button primitive. Will be replaced once shadcn theming lands.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60";
  const classes = [
    baseClasses,
    VARIANT_CLASSNAMES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      className={classes}
    >
      {children}
    </button>
  );
}

