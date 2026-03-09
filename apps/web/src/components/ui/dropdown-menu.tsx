"use client";

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const DropdownMenuProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const DropdownMenu = ({
  trigger,
  children,
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-none border-4 border-white bg-black shadow-[6px_6px_0_0_#000000] focus:outline-none p-0 overflow-hidden",
                className
              )}
            >
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<any>, {
                    onClick: (e: any) => {
                      if ((child as React.ReactElement<any>).props.onClick) (child as React.ReactElement<any>).props.onClick(e);
                      setIsOpen(false);
                    },
                  });
                }
                return child;
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-none px-4 py-3 text-base font-sans font-black uppercase tracking-widest text-white transition-colors hover:bg-[#FF4D00] focus:bg-[#FF4D00] focus:text-white",
        className
      )}
    >
      {children}
    </button>
  );
};
