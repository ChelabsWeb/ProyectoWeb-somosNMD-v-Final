"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const Carousel = ({
  items,
  renderItem,
  className,
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="min-w-full flex-shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 h-full top-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto h-12 w-12 flex border-4 border-white items-center justify-center rounded-none bg-black text-white shadow-[4px_4px_0_0_#000000] hover:bg-[#FF4D00] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all font-sans font-black text-xl"
        >
          ←
        </button>
        <button
          onClick={next}
          className="pointer-events-auto h-12 w-12 flex border-4 border-white items-center justify-center rounded-none bg-black text-white shadow-[4px_4px_0_0_#000000] hover:bg-[#FF4D00] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all font-sans font-black text-xl"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "h-4 w-4 rounded-none border-2 border-white transition-all",
              currentIndex === idx ? "bg-[#FF4D00] w-12" : "bg-black hover:bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
};
