import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-none border-4 border-white/20 bg-white/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
