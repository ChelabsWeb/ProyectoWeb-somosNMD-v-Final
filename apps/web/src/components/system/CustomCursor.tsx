"use client";

import { useEffect, useRef, useState, type FC } from "react";

const INTERACTIVE_ELEMENTS_SELECTOR =
  'a, button, [role="button"], [role="link"], [data-cursor="interactive"], input, textarea, select, label';

export const CustomCursor: FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const positionRef = useRef({ x: -100, y: -100 });
  
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasFinePointer = window.matchMedia("(pointer: fine)");

    if (prefersReducedMotion.matches || !hasFinePointer.matches) return;

    document.body.classList.add("custom-cursor-active");

    const animate = () => {
      if (!cursorRef.current) return;

      const { x, y } = pointerRef.current;
      // Tight lerp for responsive crosshair
      const nextX = positionRef.current.x + (x - positionRef.current.x) * 0.6;
      const nextY = positionRef.current.y + (y - positionRef.current.y) * 0.6;

      positionRef.current = { x: nextX, y: nextY };
      
      cursorEl.style.left = `${nextX}px`;
      cursorEl.style.top = `${nextY}px`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      
      if (!isVisible) setIsVisible(true);

      if (event.target instanceof Element) {
        const isOnInteractive = event.target.closest(INTERACTIVE_ELEMENTS_SELECTOR) !== null;
        if (isOnInteractive !== isInteractive) setIsInteractive(isOnInteractive);
      }
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      positionRef.current = { ...pointerRef.current };
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerenter", handlePointerEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isInteractive, isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div 
        className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${isInteractive ? "scale-125" : "scale-100"}`}
      >
        <div className={`relative w-full h-full flex items-center justify-center ${isInteractive ? "animate-spin" : "transition-transform duration-300 rotate-0"}`} style={{ animationDuration: '1.5s' }}>
          {/* Horizontal line */}
          <div className="absolute w-full h-[2px] bg-white" />
          {/* Vertical line */}
          <div className="absolute w-[2px] h-full bg-white" />
        </div>
      </div>
    </div>
  );
};
