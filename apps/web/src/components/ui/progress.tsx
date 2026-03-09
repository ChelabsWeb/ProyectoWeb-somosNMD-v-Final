"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-8 w-full overflow-hidden rounded-none border-4 border-white bg-black shadow-[6px_6px_0_0_#000000]",
          className
        )}
        {...props}
      >
        <motion.div
          className="h-full w-full flex-1 bg-[#FF4D00] border-r-4 border-white transition-all duration-500 ease-out"
          initial={{ x: "-100%" }}
          animate={{ x: `-${100 - percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
