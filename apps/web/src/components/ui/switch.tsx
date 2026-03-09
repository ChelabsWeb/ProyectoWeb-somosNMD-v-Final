"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, defaultChecked, checked, onCheckedChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <label
        className={cn(
          "relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center border-4 border-white bg-black transition-all duration-200 shadow-[4px_4px_0_0_#000000]",
          "focus-within:outline-none focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none",
          isChecked ? "bg-[#FF4D00] border-[#FF4D00]" : "",
          className
        )}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <motion.span
          className={cn(
            "pointer-events-none block h-7 w-7 border-4 border-black bg-white shadow-none ring-0",
          )}
          layout
          initial={false}
          animate={{ x: isChecked ? 40 : 4 }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
