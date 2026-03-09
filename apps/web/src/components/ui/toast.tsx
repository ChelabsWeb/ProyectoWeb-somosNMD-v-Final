"use client";

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type ToastType = "default" | "success" | "destructive" | "warning";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
}

const ToastContext = React.createContext<{
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => React.useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={cn(
                "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-none border-4 p-4 shadow-[8px_8px_0_0_#000000] transition-all",
                toast.type === "destructive" ? "border-white bg-[#FF4D00] text-white" :
                toast.type === "success" ? "border-white bg-[#0055FF] text-white" :
                "border-white bg-black text-white"
              )}
            >
              <div className="flex w-full flex-col gap-1">
                {toast.title && <div className="text-base font-sans font-black uppercase tracking-widest">{toast.title}</div>}
                {toast.description && <div className="text-sm font-bold opacity-90 uppercase tracking-widest">{toast.description}</div>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="absolute right-4 top-4 rounded-none p-1 text-white hover:text-black hover:bg-white font-sans font-black transition-colors"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
