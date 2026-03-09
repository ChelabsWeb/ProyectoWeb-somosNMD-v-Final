import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-none overflow-hidden bg-black border-4 border-white shadow-[10px_10px_0_0_#000000]",
        "flex flex-col items-start justify-start p-6 md:p-8 text-left",
        "transition-all duration-200 ease-in-out",
        "hover:translate-y-[10px] hover:translate-x-[10px] hover:shadow-none",
        className
      )}
    >
      {children}
    </div>
  );
}
