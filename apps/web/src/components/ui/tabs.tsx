"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: "",
  setActiveTab: () => {},
});

export const Tabs = ({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("flex flex-col w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-14 w-full items-center justify-center rounded-none bg-black p-0 border-4 border-white shadow-[6px_6px_0_0_#000000]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative flex-1 h-full inline-flex items-center justify-center whitespace-nowrap rounded-none px-4 py-2 text-base font-sans font-black z-10 border-r-4 border-white last:border-r-0 transition-all focus-visible:outline-none focus-visible:bg-[#FF4D00] disabled:pointer-events-none disabled:opacity-50 tracking-widest uppercase",
        isActive ? "text-white" : "text-white hover:bg-[#0055FF] hover:text-white",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 bg-[#FF4D00] rounded-none z-0"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "mt-6 border-4 border-white bg-black p-6 shadow-[6px_6px_0_0_#000000] ring-offset-background focus-visible:outline-none",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
