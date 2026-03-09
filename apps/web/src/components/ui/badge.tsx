import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border-4 border-black px-4 py-1 text-sm font-sans font-black uppercase tracking-widest transition-all duration-200 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none focus:outline-none focus:ring-0",
  {
    variants: {
      variant: {
        default: "bg-[#FF4D00] text-white border-white hover:bg-[#0055FF] hover:border-[#0055FF]",
        secondary: "bg-[#0055FF] text-white border-white hover:bg-[#FF4D00] hover:border-[#FF4D00]",
        destructive: "bg-white text-black border-black hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00]",
        outline: "text-[#0055FF] border-[#0055FF] bg-black hover:bg-[#0055FF] hover:text-white",
        brutalist: "bg-white text-black border-black shadow-[6px_6px_0_0_#000000] hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
