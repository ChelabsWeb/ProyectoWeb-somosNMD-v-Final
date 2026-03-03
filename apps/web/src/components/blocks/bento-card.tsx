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
        "rounded-[24px] md:rounded-[32px] overflow-hidden bg-card border border-white/5",
        "flex flex-col items-center justify-center p-6 text-center",
        "transition-all duration-500 ease-out",
        "hover:bg-card/80 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
}
