"use client";

import { useEffect, useRef, useState, type FC } from "react";

const INTERACTIVE_ELEMENTS_SELECTOR =
  'a, button, [role="button"], [role="link"], [data-cursor="interactive"], input, textarea, select';

/**
 * Global custom cursor with subtle easing and interactive state styling.
 * Cursor is disabled automatically on touch devices or when reduced motion is preferred.
 */
export const CustomCursor: FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);
  const pressedRef = useRef(false);
  const isActiveRef = useRef(false);

  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;

    if (!cursorEl) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const hasFinePointer = window.matchMedia("(pointer: fine)");

    if (prefersReducedMotion.matches || !hasFinePointer.matches) {
      return;
    }

    isActiveRef.current = true;
    document.body.classList.add("custom-cursor-active");

    const initializePosition = (x: number, y: number) => {
      pointerRef.current = { x, y };
      positionRef.current = { x, y };
      cursorEl.style.left = `${x}px`;
      cursorEl.style.top = `${y}px`;
    };

    initializePosition(window.innerWidth / 2, window.innerHeight / 2);

    const animate = () => {
      if (!isActiveRef.current || !cursorRef.current) {
        return;
      }

      const { x, y } = pointerRef.current;
      const nextX = positionRef.current.x + (x - positionRef.current.x) * 0.18;
      const nextY = positionRef.current.y + (y - positionRef.current.y) * 0.18;

      positionRef.current = { x: nextX, y: nextY };

      cursorRef.current.style.left = `${nextX}px`;
      cursorRef.current.style.top = `${nextY}px`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handlePointerMove = (event: PointerEvent) => {
      if (!isActiveRef.current) {
        return;
      }

      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      if (event.target instanceof Element) {
        const isOnInteractive =
          event.target.closest(INTERACTIVE_ELEMENTS_SELECTOR) !== null;

        if (isOnInteractive !== interactiveRef.current) {
          interactiveRef.current = isOnInteractive;
          setIsInteractive(isOnInteractive);
        }
      }
    };

    const handlePointerDown = () => {
      if (isActiveRef.current && !pressedRef.current) {
        pressedRef.current = true;
        setIsPressed(true);
      }
    };

    const handlePointerUp = () => {
      if (pressedRef.current) {
        pressedRef.current = false;
        setIsPressed(false);
      }
    };

    const handlePointerLeave = () => {
      if (!isActiveRef.current) {
        return;
      }

      visibleRef.current = false;
      setIsVisible(false);

      if (pressedRef.current) {
        pressedRef.current = false;
        setIsPressed(false);
      }
    };

    const handlePointerEnter = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      positionRef.current = { ...pointerRef.current };
      cursorEl.style.left = `${pointerRef.current.x}px`;
      cursorEl.style.top = `${pointerRef.current.y}px`;

      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        visibleRef.current = false;
        interactiveRef.current = false;
        pressedRef.current = false;
        setIsVisible(false);
        setIsInteractive(false);
        setIsPressed(false);

        if (isActiveRef.current) {
          isActiveRef.current = false;
          document.body.classList.remove("custom-cursor-active");
          if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }
      }
    };

    prefersReducedMotion.addEventListener("change", handleReducedMotionChange);

    return () => {
      prefersReducedMotion.removeEventListener(
        "change",
        handleReducedMotionChange,
      );

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerenter", handlePointerEnter);

      document.body.classList.remove("custom-cursor-active");
      isActiveRef.current = false;
    };
  }, []);

  useEffect(() => {
    const cursorEl = cursorRef.current;

    if (!cursorEl) {
      return;
    }

    const scale = isPressed ? 0.85 : isInteractive ? 1.35 : 1;
    cursorEl.style.setProperty("--cursor-scale", scale.toString());
    cursorEl.style.setProperty("--cursor-opacity", isVisible ? "1" : "0");
    const state = isPressed
      ? "pressed"
      : isInteractive
        ? "interactive"
        : "base";
    cursorEl.dataset.cursorState = state;
  }, [isInteractive, isPressed, isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor"
      data-cursor-state="base"
    />
  );
};
