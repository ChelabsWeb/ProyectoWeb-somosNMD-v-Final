"use client";

import Image from "next/image";
import { useState, type FC } from "react";
import { Button } from "@nmd/ui";
import { useAudio } from "@/context/AudioProvider";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { useReducedMotionPreference } from "@nmd/animation";
import { trackEvent } from "../../lib/analytics";

type TrackInfo = {
  title: string;
  duration: string;
};

type ProjectTheme = {
  accent: string;
  accentSoft: string;
  borderGradient: string;
  badgeBg: string;
  overlay: string;
  spotifyGradient: string;
  glow: string;
};

type ProjectMeta = {
  type: string;
  year: string;
  region?: string;
};

type ProjectEntry = {
  id: string;
  title: string;
  description: string;
  artworkSrc: string;
  audioSrc: string;
  spotifyUrl: string;
  tracklist: TrackInfo[];
  theme: ProjectTheme;
  meta: ProjectMeta;
};

const PROJECT_PLACEHOLDERS: ProjectEntry[] = [
  {
    id: "junta",
    title: "JUNTA",
    description: "Nomades debut album.",
    artworkSrc: "/assets/artworks/Portada JUNTA.jpg",
    audioSrc: "/assets/audio/lo-quiero-asi-preview.wav",
    spotifyUrl:
      "https://open.spotify.com/intl-es/album/0JfCrGbMDwV0FuQwqmpOde?si=fpKPQyy-R-SvnToxetbmGg",
    theme: {
      accent: "#9AEF83",
      accentSoft: "rgba(154, 239, 131, 0.35)",
      borderGradient:
        "linear-gradient(135deg, rgba(154,239,131,0.6) 0%, rgba(29,49,36,0.55) 45%, rgba(6,11,8,1) 100%)",
      badgeBg: "rgba(154, 239, 131, 0.12)",
      overlay:
        "linear-gradient(180deg, rgba(3,9,5,0) 0%, rgba(3,9,5,0.85) 100%)",
      spotifyGradient:
        "linear-gradient(135deg, rgba(154,239,131,0.95) 0%, rgba(59,202,123,0.95) 100%)",
      glow: "0 24px 60px rgba(154,239,131,0.25)",
    },
    meta: {
      type: "ALBUM",
      year: "2024",
      region: "Nomades",
    },
    tracklist: [
      { title: "PANIKO", duration: "3:24" },
      { title: "NIKE", duration: "2:58" },
      { title: "SWING", duration: "2:20" },
      { title: "PARQUE SONADO", duration: "3:04" },
      { title: "BOTIJAS / JUNTA", duration: "4:16" },
      { title: "NOMADES", duration: "5:27" },
      { title: "COMO ES ESO", duration: "3:49" },
      { title: "RUIDO", duration: "3:02" },
      { title: "AMSTERDAM", duration: "2:50" },
      { title: "NO PARE", duration: "3:54" },
    ],
  },
  {
    id: "egolatra",
    title: "EGOLATRA",
    description: "Nacht debut album.",
    artworkSrc: "/assets/artworks/EGOLATRA.png",
    audioSrc: "/assets/audio/egolatra-preview.wav",
    spotifyUrl:
      "https://open.spotify.com/intl-es/album/7MlGv3nb7tM9jTQsuYHVMx?si=1g6PYr-OSGG3mBdpAXR8bg",
    theme: {
      accent: "#FF6B8A",
      accentSoft: "rgba(255, 107, 138, 0.35)",
      borderGradient:
        "linear-gradient(135deg, rgba(255,107,138,0.55) 0%, rgba(78,20,34,0.65) 50%, rgba(12,9,12,0.95) 100%)",
      badgeBg: "rgba(255, 107, 138, 0.12)",
      overlay:
        "linear-gradient(180deg, rgba(28,8,12,0) 0%, rgba(14,3,6,0.85) 100%)",
      spotifyGradient:
        "linear-gradient(135deg, rgba(255,107,138,0.95) 0%, rgba(180,40,70,0.95) 100%)",
      glow: "0 24px 60px rgba(255,107,138,0.28)",
    },
    meta: {
      type: "ALBUM",
      year: "2025",
      region: "Nacht",
    },
    tracklist: [
      { title: "hiraeth (INTRO)", duration: "1:24" },
      { title: "Nqssa.", duration: "2:07" },
      { title: "MASERATI psi", duration: "2:37" },
      { title: "nada q decir.", duration: "2:07" },
      { title: "(piscis)", duration: "2:42" },
      { title: "tan lejos </3", duration: "2:42" },
      { title: "SOLO", duration: "2:17" },
      { title: "NO SIENTO NADA", duration: "1:49" },
      { title: "Sol", duration: "2:56" },
    ],
  },
];

const ProjectCard: FC<{ project: ProjectEntry }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { play, stop, isPlaying, nowPlaying } = useAudio();
  const prefersReducedMotion = useReducedMotionPreference();

  const accent = project.theme.accent;
  const accentSoft = project.theme.accentSoft;
  const isThisPlaying = isPlaying && nowPlaying === project.audioSrc;

  const handlePlay = () => {
    if (prefersReducedMotion) {
      return;
    }

    if (isThisPlaying) {
      stop();
      trackEvent("audio_preview_stop", { project_id: project.id });
    } else {
      play(project.audioSrc);
      trackEvent("audio_preview_play", { project_id: project.id });
    }
  };

  const innerHoverClasses = prefersReducedMotion
    ? ""
    : "group-hover:-translate-y-2 group-hover:bg-neutral-900/80 group-hover:shadow-[0_32px_80px_rgba(0,0,0,0.45)]";
  const imageHoverClasses = prefersReducedMotion ? "" : "group-hover:scale-[1.04]";

  return (
    <article
      className={`group relative transition-transform duration-500 ${
        prefersReducedMotion ? "" : "hover:-translate-y-1"
      }`}
      style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.45))" }}
    >
      <div
        className="relative rounded-[26px] p-[1px]"
        style={{
          background: project.theme.borderGradient,
          boxShadow: prefersReducedMotion ? undefined : project.theme.glow,
        }}
      >
        <div
          className={`flex h-full flex-col gap-6 rounded-[24px] border border-white/10 bg-neutral-950/80 p-6 backdrop-blur-xl transition-all duration-500 ${innerHoverClasses}`}
        >
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em]"
                style={{
                  backgroundColor: project.theme.badgeBg,
                  borderColor: project.theme.accentSoft,
                  color: accent,
                }}
              >
                {project.meta.type}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-200/80">
                {project.meta.year}
              </span>
              {project.meta.region ? (
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
                  {project.meta.region}
                </span>
              ) : null}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-50">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300/90">
              {project.description}
            </p>
          </header>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5">
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: project.theme.overlay,
                opacity: isThisPlaying ? 0.75 : 0.45,
              }}
            />
            <Image
              src={project.artworkSrc}
              alt={`${project.title} artwork`}
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 90vw"
              className={`h-full w-full object-cover transition duration-700 ease-out ${imageHoverClasses}`}
              priority={project.id === "junta"}
            />
            <div
              className={`pointer-events-none absolute inset-0 flex items-end justify-between px-5 pb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70 transition-opacity duration-500 ${
                prefersReducedMotion ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <span>Press play</span>
              <span style={{ color: accent }}>Immersive Mode</span>
            </div>
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                prefersReducedMotion ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div
                className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em]"
                style={{ color: accent }}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                  <path d="M5 3.868a1 1 0 0 1 1.555-.832l12 8.132a1 1 0 0 1 0 1.664l-12 8.132A1 1 0 0 1 5 20.132V3.868Z" />
                </svg>
                Play
              </div>
            </div>
          </div>

          <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="absolute left-0 top-0 h-full w-2/3 animate-pulse"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                opacity: 0.9,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={handlePlay}
              disabled={prefersReducedMotion}
              className="border-none text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-900 shadow-lg transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              style={{
                background: project.theme.spotifyGradient,
              }}
            >
              {isThisPlaying ? "Pause" : "Play"} Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-200 transition duration-300 hover:border-white/40"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Hide" : "View"} Tracklist
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                trackEvent("spotify_cta_click", { project_id: project.id });
                window.open(project.spotifyUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label={`${project.title} on Spotify`}
              className="flex items-center gap-2 border border-white/15 text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-100 transition duration-300 hover:text-neutral-900"
              style={{
                backgroundColor: project.theme.badgeBg,
                borderColor: project.theme.accentSoft,
                color: accent,
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm5.485 17.354a.75.75 0 0 1-1.036.263c-2.839-1.737-6.418-2.132-10.626-1.173a.75.75 0 0 1-.329-1.461c4.6-1.037 8.514-.577 11.648 1.287a.75.75 0 0 1 .343 1.084zm1.482-3.35a.9.9 0 0 1-1.242.315c-3.25-1.999-8.207-2.58-12.063-1.417a.9.9 0 1 1-.522-1.723c4.36-1.32 9.835-.676 13.523 1.527a.9.9 0 0 1 .304 1.298zm.123-3.511c-3.895-2.314-10.347-2.526-14.066-1.401a1.05 1.05 0 1 1-.608-2.01c4.293-1.3 11.395-1.054 15.8 1.572a1.05 1.05 0 1 1-1.126 1.839z" />
              </svg>
              Spotify
            </Button>
          </div>

          {isExpanded && (
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
                <span>Tracklist</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <ol
                className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
                style={{ borderLeft: `3px solid ${accentSoft}` }}
              >
                {project.tracklist.map((track, index) => (
                  <li
                    key={`${project.id}-${track.title}`}
                    className="grid grid-cols-[auto,auto,1fr,auto] items-center gap-3 rounded-xl bg-black/30 px-4 py-2 text-sm text-neutral-200"
                  >
                    <span className="font-mono text-xs text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          index < 3 ? accent : "rgba(255,255,255,0.12)",
                      }}
                    />
                    <span className="truncate">{track.title}</span>
                    <span className="text-xs text-white/50">{track.duration}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export const MusicSection: FC = () => (
  <section
    id="music"
    aria-label="Music projects"
    className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 px-6 py-20 text-neutral-50 md:px-12"
  >
    <ParticleBackground />
    <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
          Releases
        </p>
        <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-neutral-300 sm:text-[2.5rem]">
          Manteca mantecosa
        </h2>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {PROJECT_PLACEHOLDERS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);
