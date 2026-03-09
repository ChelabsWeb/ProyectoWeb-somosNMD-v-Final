"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export const RadioGroup = ({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn("grid gap-2", className)}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export const RadioGroupItem = ({
  value,
  id,
  className,
}: {
  value: string;
  id?: string;
  className?: string;
}) => {
  const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext);
  const isChecked = groupValue === value;

  return (
    <button
      type="button"
      id={id}
      onClick={() => onValueChange(value)}
      className={cn(
        "aspect-square h-8 w-8 rounded-none border-4 border-white bg-black text-[#FF4D00] shadow-[4px_4px_0_0_#000000] ring-offset-background focus:outline-none focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-all duration-200",
        isChecked ? "border-[#FF4D00]" : "hover:border-[#FF4D00]",
        className
      )}
    >
      <motion.div
        initial={false}
        animate={{ scale: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="h-4 w-4 rounded-none bg-[#FF4D00]"
      />
    </button>
  );
};
