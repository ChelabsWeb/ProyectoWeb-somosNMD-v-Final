import * as React from "react"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation={orientation}
    className={cn(
      "shrink-0 bg-white",
      orientation === "horizontal" ? "h-1 w-full" : "h-full w-1",
      className
    )}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }
