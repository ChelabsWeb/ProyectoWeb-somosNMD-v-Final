"use client";

import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { useLenis } from "@/context/LenisContext";
import { trackEvent } from "@/lib/analytics";

type MenuSection = {
  id: string;
  label: string;
  description?: string;
};

const SECTIONS: MenuSection[] = [
  { id: "hero", label: "Inicio" },
  { id: "artists", label: "Artists" },
  { id: "music", label: "Music" },
  { id: "teaser", label: "Teaser" },
  { id: "contact", label: "Contact" },
];

/**
 * Floating navigation menu accessible from the top-right corner.
 * Provides quick links to primary sections, jumping instantly to targets.
 */
export const QuickNavMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current) {
        return;
      }
      if (
        !menuRef.current.contains(event.target as Node) &&
        event.target !== toggleButtonRef.current
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, handleClose]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      trackEvent("menu_nav_click", { section: sectionId });

      if (sectionId === "hero") {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        setIsOpen(false);
        return;
      }

      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      if (lenis) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }

      setIsOpen(false);
    },
    [lenis],
  );

  return (
    <div className="quick-nav fixed right-4 top-4 z-[70] md:right-6 md:top-6">
      <button
        ref={toggleButtonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="quick-nav-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className="quick-nav__toggle"
      >
        <span className="sr-only">
          {isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        </span>
        <span aria-hidden="true" className="quick-nav__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        ref={menuRef}
        id="quick-nav-panel"
        role="menu"
        aria-hidden={!isOpen}
        className={`quick-nav__panel ${isOpen ? "quick-nav__panel--open" : ""}`}
      >
        <p className="quick-nav__label">Ir a</p>
        <ul className="quick-nav__list">
          {SECTIONS.map((section) => (
            <li key={section.id} role="none">
              <button
                type="button"
                role="menuitem"
                className="quick-nav__item"
                onClick={() => handleNavigate(section.id)}
              >
                <span>{section.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
