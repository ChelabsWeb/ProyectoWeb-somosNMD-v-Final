"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
    
    // Controlled vs Uncontrolled sync
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <div className={cn("relative flex items-center justify-center w-8 h-8", className)}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer peer"
          ref={ref}
          {...props}
        />
        <div className={cn(
          "w-full h-full border-4 border-white bg-black rounded-none shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center",
          "peer-focus-visible:outline-none peer-focus-visible:translate-x-[4px] peer-focus-visible:translate-y-[4px] peer-focus-visible:shadow-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          isChecked ? "bg-[#FF4D00] border-[#FF4D00] shadow-[4px_4px_0_0_#000000]" : ""
        )}>
          <motion.svg
            initial={false}
            animate={{ scale: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full h-full text-white p-[2px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
