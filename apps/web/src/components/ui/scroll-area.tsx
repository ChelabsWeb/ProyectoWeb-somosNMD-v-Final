"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(({ className, children, orientation = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden border-4 border-white bg-black shadow-[6px_6px_0_0_#000000] rounded-none",
        className
      )}
      {...props}
    >
      <div 
        className={cn(
          "h-full w-full",
          orientation === "vertical" ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden",
          /* Custom Brutalist scrollbar styles using pseudo-elements */
          "[&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3",
          "[&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-track]:border-l-4 [&::-webkit-scrollbar-track]:border-white",
          "[&::-webkit-scrollbar-thumb]:bg-[#FF4D00] [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:border-l-4 hover:[&::-webkit-scrollbar-thumb]:bg-white"
        )}
      >
        {children}
      </div>
    </div>
  )
})
ScrollArea.displayName = "ScrollArea"
