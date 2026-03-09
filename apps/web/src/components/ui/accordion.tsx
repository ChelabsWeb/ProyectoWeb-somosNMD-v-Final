"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  openValue: string | null;
  toggle: (value: string) => void;
}>({
  openValue: null,
  toggle: () => {},
});

export const Accordion = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [openValue, setOpenValue] = React.useState<string | null>(null);

  const toggle = React.useCallback((value: string) => {
    setOpenValue((prev) => (prev === value ? null : value));
  }, []);

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div className={cn("w-full flex flex-col space-y-6", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const { openValue, toggle } = React.useContext(AccordionContext);
  const isOpen = openValue === value;

  return (
    <div className={cn("border-4 border-white rounded-none overflow-hidden bg-black shadow-[6px_6px_0_0_#000000] transition-all duration-200", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, toggle: () => toggle(value) });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger = ({ children, isOpen, toggle, className }: { children: React.ReactNode; isOpen?: boolean; toggle?: () => void; className?: string }) => {
  return (
    <button
      onClick={toggle}
      className={cn(
        "flex w-full items-center justify-between px-6 py-5 text-base font-sans font-black uppercase tracking-widest transition-all hover:bg-[#FF4D00] hover:text-white focus:bg-[#FF4D00] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        isOpen ? "bg-[#FF4D00] text-white border-b-4 border-white" : "text-white",
        className
      )}
    >
      {children}
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="shrink-0 ml-4 font-sans font-black text-2xl"
      >
        +
      </motion.div>
    </button>
  );
};

export const AccordionContent = ({ children, isOpen, className }: { children: React.ReactNode; isOpen?: boolean; className?: string }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("px-6 py-5 text-base font-sans text-white leading-relaxed border-t-0 border-white bg-black", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
