"use client";

import type { FC, ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

/**
 * Shared page shell used across top-level routes.
 * Adds background gradient and nav spacing.
 */
export const PageShell: FC<PageShellProps> = ({ children }) => (
  <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-neutral-50">
    {children}
  </div>
);
