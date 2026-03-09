"use client";

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  className,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-full items-center justify-between rounded-none border-4 border-white bg-black shadow-[6px_6px_0_0_#000000] px-4 py-2 text-base font-sans font-black tracking-widest uppercase text-white focus:outline-none focus:translate-x-[6px] focus:translate-y-[6px] focus:shadow-none transition-all duration-200"
      >
        <span className="truncate mr-4">{selectedLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-none border-4 border-white bg-black shadow-[6px_6px_0_0_#000000]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="flex w-full cursor-pointer select-none items-center px-4 py-4 text-base font-sans font-black tracking-widest uppercase text-left hover:bg-[#FF4D00] hover:text-white focus:bg-[#FF4D00] focus:text-white focus:outline-none text-white transition-colors"
                onClick={() => {
                  onValueChange?.(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
