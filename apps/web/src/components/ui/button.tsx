"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans font-black uppercase tracking-widest transition-all duration-200 border-4 border-white rounded-none shadow-[6px_6px_0_0_#000000] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden relative",
  {
    variants: {
      variant: {
        default: "bg-[#FF4D00] text-white border-white hover:bg-[#0055FF] hover:border-[#0055FF] hover:text-white",
        destructive: "bg-black text-white border-white hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00]",
        outline: "bg-transparent text-white border-white hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF]",
        secondary: "bg-[#0055FF] text-white border-white hover:bg-black hover:text-[#0055FF] hover:border-[#0055FF]",
        ghost: "border-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:border-white hover:bg-[#FF4D00] hover:text-white hover:shadow-[6px_6px_0_0_#000000]",
        link: "border-transparent shadow-none hover:translate-x-0 hover:translate-y-0 underline-offset-4 hover:underline text-[#0055FF] hover:text-[#FF4D00] italic",
      },
      size: {
        default: "h-14 px-8 py-2 text-lg",
        sm: "h-10 px-4 text-sm shadow-[4px_4px_0_0_#000000] hover:translate-x-[4px] hover:translate-y-[4px]",
        lg: "h-16 px-12 text-2xl shadow-[8px_8px_0_0_#000000] hover:translate-x-[8px] hover:translate-y-[8px]",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  alternateText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, alternateText, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // We only apply Framer Motion if not asChild, to simplify Slot usage.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as any}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        <span className={cn(
          "inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out",
          alternateText ? "group-hover:-translate-y-[150%]" : ""
        )}>
          {children}
        </span>
        {alternateText && (
          <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-200 ease-out text-white md:group-hover:text-white italic font-sans font-black text-xl tracking-widest">
            {alternateText}
          </span>
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
