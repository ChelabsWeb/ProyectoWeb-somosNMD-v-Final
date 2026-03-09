import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-none border-4 border-white bg-black px-4 py-2 text-base text-white font-sans font-black tracking-widest uppercase shadow-[6px_6px_0_0_#000000] transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-white focus-visible:translate-y-[6px] focus-visible:translate-x-[6px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
