import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-none border-4 border-white bg-black px-4 py-3 text-base text-white font-sans font-black tracking-widest uppercase shadow-[6px_6px_0_0_#000000] transition-all duration-200 placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-white focus-visible:translate-y-[6px] focus-visible:translate-x-[6px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
