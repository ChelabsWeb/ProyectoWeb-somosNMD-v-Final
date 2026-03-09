"use client";

import { useRef, useEffect, type FC } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const FooterSection: FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Split text into lines/spans for animation
    const text = textRef.current;
    const content = text.textContent || "";
    text.innerHTML = "";

    // Create span for each letter
    const letters = content.split("").map((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(-100px)"; // Start from above
      text.appendChild(span);
      return span;
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      gsap.to(letters, {
        scrollTrigger: {
          trigger: text,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "bounce.out", // Adds a nice falling bounce effect
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="relative flex min-h-[100vh] flex-col overflow-hidden border-t-4 border-white bg-black font-mono uppercase text-white shadow-[0_-10px_0_0_#000000]"
    >
      {/* Top Border / Marquee style or small text */}
      <motion.div
        variants={itemVariants}
        className="flex shrink-0 items-center justify-between border-b-4 border-white px-6 py-4 text-xs tracking-widest md:text-sm"
      >
        <span>NOMADES_MVD_UY</span>
        <span>© {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS</span>
      </motion.div>

      {/* Main Content */}
      <div className="grid w-full grid-cols-1 md:grid-cols-12">
        {/* Left Column (Links) */}
        <div className="border-r-4 border-white md:col-span-8">
          <div className="grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              variants={itemVariants}
              className="flex min-h-[250px] flex-col justify-between border-b-4 border-white p-8 sm:border-r-4 md:p-12"
            >
              <span className="mb-8 block text-xs tracking-[0.2em] opacity-50">
                // REDES
              </span>
              <ul className="space-y-4 font-sans text-2xl font-black tracking-tight md:text-3xl">
                <li>
                  <Link
                    href="https://instagram.com"
                    className="flex items-center justify-between hover:underline"
                  >
                    INSTAGRAM <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    className="flex items-center justify-between hover:underline"
                  >
                    TWITTER <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://youtube.com"
                    className="flex items-center justify-between hover:underline"
                  >
                    YOUTUBE <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex min-h-[250px] flex-col justify-between border-b-4 border-white p-8 sm:border-r-4 md:p-12"
            >
              <span className="mb-8 block text-xs tracking-[0.2em] opacity-50">
                // EXPLORAR
              </span>
              <ul className="space-y-4 font-sans text-2xl font-black tracking-tight md:text-3xl">
                <li>
                  <Link
                    href="#proyectos"
                    className="flex items-center justify-between hover:underline"
                  >
                    PROYECTOS <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#equipo"
                    className="flex items-center justify-between hover:underline"
                  >
                    EL EQUIPO <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contacto"
                    className="flex items-center justify-between hover:underline"
                  >
                    CONTACTO <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col-span-1 flex min-h-[250px] flex-col justify-between border-b-4 border-white p-8 sm:col-span-2 sm:border-r-0 md:p-12 lg:col-span-1 lg:border-r-0"
            >
              <span className="mb-8 block text-xs tracking-[0.2em] opacity-50">
                // LEGAL
              </span>
              <ul className="space-y-4 font-sans text-xl font-black tracking-tight md:text-2xl">
                <li>
                  <Link href="/terminos" className="block hover:underline">
                    TÉRMINOS Y CONDICIONES
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="block hover:underline">
                    POLÍTICA DE PRIVACIDAD
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Column (Big CTA / Email) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between border-b-4 border-white p-8 md:col-span-4 md:border-b-0 md:p-12"
        >
          <span className="mb-8 block text-xs tracking-[0.2em] opacity-50">
            // INICIAR PROPUESTA
          </span>
          <div>
            <h3 className="mb-8 font-sans text-4xl font-black leading-[0.9] tracking-tight md:text-5xl lg:text-6xl">
              TRABAJEMOS
              <br />
              JUNTOS.
            </h3>
            <a
              href="mailto:hola@nomades.uy"
              className="inline-block whitespace-nowrap border-4 border-white bg-[#FF4D00] px-8 py-4 text-sm font-black text-white shadow-[6px_6px_0_0_#000000] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-white hover:text-black hover:shadow-none"
            >
              ENVIAR EMAIL
            </a>
          </div>
        </motion.div>
      </div>

      {/* Massive Bottom Text */}
      <motion.div
        variants={itemVariants}
        className="mt-auto flex w-full shrink-0 items-end justify-center overflow-hidden border-t-4 border-white pb-4 pt-8"
      >
        <h2
          ref={textRef}
          className="text-[35vw] font-black leading-[0.75] tracking-tighter text-white drop-shadow-[8px_8px_0_#FF4D00]"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          NMD
        </h2>
      </motion.div>
    </motion.footer>
  );
};
