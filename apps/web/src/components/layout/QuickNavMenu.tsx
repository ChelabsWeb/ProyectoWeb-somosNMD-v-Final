"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/context/LenisContext";
import { trackEvent } from "@/lib/analytics";
import { loaderHiddenEventName } from "@/lib/app-ready";

type MenuSection = {
  id: string;
  label: string;
};

const SECTIONS: MenuSection[] = [
  { id: "hero", label: "Inicio" },
  { id: "artists", label: "Artists" },
  { id: "music", label: "Music" },
  { id: "contact", label: "Contact" },
];

const ARTIST_IMAGES = [
  { src: "/assets/artists/Gervi.jpg", name: "Gervi" },
  { src: "/assets/artists/Izquierdo.jpg", name: "Izquierdo" },
  { src: "/assets/artists/JuanMa.jpg", name: "JuanMa" },
  { src: "/assets/artists/Caba.jpg", name: "Caba" },
  { src: "/assets/artists/Justino.jpg", name: "Justino" },
  { src: "/assets/artists/Kenma.jpg", name: "Kenma" },
  { src: "/assets/artists/Letie.jpg", name: "Letie" },
  { src: "/assets/artists/Luccio.jpg", name: "Luccio" },
  { src: "/assets/artists/Luquilla.jpg", name: "Luquilla" },
  { src: "/assets/artists/Nacht.jpg", name: "Nacht" },
  { src: "/assets/artists/Nei.jpg", name: "Nei" },
  { src: "/assets/artists/Quei.jpg", name: "Quei" },
];

/**
 * Fullscreen navigation menu with artist gallery.
 * Left side: Infinite scrolling artist photos
 * Right side: Navigation links with round_8four typography
 */
export const QuickNavMenu: FC = () => {
  const [isMenuReady, setIsMenuReady] = useState<boolean>(() =>
    typeof window !== "undefined" ? Boolean((window as Window & { __nmdLoaderHidden?: boolean }).__nmdLoaderHidden) : false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  // Mount the component immediately for button visibility
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait for loader to hide before enabling menu functionality
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as Window & { __nmdLoaderHidden?: boolean };
    if (win.__nmdLoaderHidden) {
      setIsMenuReady(true);
      return;
    }

    const handleReady = () => {
      setIsMenuReady(true);
    };

    window.addEventListener(loaderHiddenEventName, handleReady);
    const fallbackTimeout = window.setTimeout(() => setIsMenuReady(true), 10000);

    return () => {
      window.removeEventListener(loaderHiddenEventName, handleReady);
      window.clearTimeout(fallbackTimeout);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const refreshScrollTriggers = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

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
        refreshScrollTriggers();
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
      if (sectionId === "artists" && typeof window !== "undefined") {
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("artists:reset"));
        });
        return;
      }
      refreshScrollTriggers();
    },
    [lenis, refreshScrollTriggers],
  );

  // Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Toggle Button - Always visible after mount */}
      <button
        ref={toggleButtonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="quick-nav-panel"
        onClick={() => isMenuReady && setIsOpen((prev) => !prev)}
        className={`quick-nav__toggle fixed right-4 top-4 z-[80] md:right-6 md:top-6 ${!isMenuReady ? "opacity-50" : ""}`}
        disabled={!isMenuReady}
      >
        <span className="sr-only">
          {isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        </span>
        <span aria-hidden="true" className={`quick-nav__icon ${isOpen ? "quick-nav__icon--open" : ""}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Fullscreen Menu Panel */}
      <div
        ref={menuRef}
        id="quick-nav-panel"
        role="menu"
        aria-hidden={!isOpen}
        className={`fullscreen-menu ${isOpen ? "fullscreen-menu--open" : ""}`}
      >
        {/* Left Side - Artist Gallery */}
        <div className="fullscreen-menu__gallery">
          <div className="fullscreen-menu__gallery-track">
            {/* First set of images */}
            {ARTIST_IMAGES.map((artist, index) => (
              <div key={`a-${index}`} className="fullscreen-menu__gallery-item">
                <Image
                  src={artist.src}
                  alt={artist.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {ARTIST_IMAGES.map((artist, index) => (
              <div key={`b-${index}`} className="fullscreen-menu__gallery-item">
                <Image
                  src={artist.src}
                  alt={artist.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Navigation */}
        <nav className="fullscreen-menu__nav">
          <ul className="fullscreen-menu__list">
            {SECTIONS.map((section) => (
              <li key={section.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className="fullscreen-menu__link"
                  onClick={() => handleNavigate(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
