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
  { id: "artists", label: "Artistas" },
  { id: "music", label: "Música" },
  { id: "shop", label: "Tienda" },
  { id: "contact", label: "Contacto" },
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Wait for loader to hide before enabling menu functionality
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as Window & { __nmdLoaderHidden?: boolean };
    if (win.__nmdLoaderHidden) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

      const isHomePage = typeof window !== "undefined" && window.location.pathname === "/";

      // 1. Handle Top/Hero
      if (sectionId === "hero") {
        if (isHomePage) {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: "auto" });
          }
          setIsOpen(false);
          refreshScrollTriggers();
        } else {
          window.location.href = "/";
        }
        return;
      }

      // 2. Handle External Page (Shop)
      if (sectionId === "shop") {
        setIsOpen(false);
        if (typeof window !== "undefined" && window.location.pathname === "/shop") {
          // If already on shop, just close menu
          return;
        }
        window.location.href = "/shop";
        return;
      }

      // 3. Handle Other In-Page Sections
      const target = document.getElementById(sectionId);
      if (!target) {
        // If target not found (probably on other page), go to home with hash
        window.location.href = `/#${sectionId}`;
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
        className={`fixed right-4 md:right-8 top-4 md:top-8 z-[110] group flex h-14 w-14 items-center justify-center rounded-none bg-black border-4 border-white shadow-[6px_6px_0_0_#000000] text-white transition-all hover:bg-[#FF4D00] hover:text-white hover:border-white hover:shadow-[6px_6px_0_0_#000000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] ${!isMenuReady ? "opacity-30" : ""}`}
        disabled={!isMenuReady}
        aria-label="Toggle Menu"
      >
        <div className="flex flex-col justify-center items-center w-5 h-5 relative">
          <span className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5 group-hover:-translate-y-2"}`} />
          <span className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-[2px] w-5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5 group-hover:translate-y-2"}`} />
        </div>
      </button>

      {/* Fullscreen Menu Panel */}
      <div
        ref={menuRef}
        id="quick-nav-panel"
        role="menu"
        aria-hidden={!isOpen}
        className={`fullscreen-menu ${isOpen ? "fullscreen-menu--open" : ""}`}
      >
        {/* Left Side - Artist Gallery (3 columns grid) */}
        <div className="fullscreen-menu__gallery">
          <div className="fullscreen-menu__gallery-track">
            {/* First set of images */}
            {ARTIST_IMAGES.map((artist, index) => (
              <div key={`a-${index}`} className="fullscreen-menu__gallery-item">
                <Image
                  src={artist.src}
                  alt={artist.name}
                  fill
                  sizes="17vw"
                  className="object-cover"
                  loading="lazy"
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
                  sizes="17vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Navigation */}
        <nav className="fullscreen-menu__nav">
          <ul className="fullscreen-menu__list items-start">
            <li className="mb-8 overflow-hidden">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Seleccionar Camino</span>
            </li>
            {SECTIONS.map((section) => (
              <li key={section.id} role="none" className="overflow-hidden">
                <button
                  type="button"
                  role="menuitem"
                  className="fullscreen-menu__link font-bold tracking-tighter hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
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
