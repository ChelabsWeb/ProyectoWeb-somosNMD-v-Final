"use client";

import Image from "next/image";
import { useState, type FC } from "react";
import { Button } from "@nmd/ui";
import { useAudio } from "@/context/AudioProvider";
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
  const isThisPlaying = isPlaying && nowPlaying === project.audioSrc;

  return (
    <article
      className="group relative border border-white/10 bg-black transition-colors hover:bg-neutral-900/40"
    >
      {/* Archival Header */}
      <div className="flex justify-between border-b border-white/10 p-3 font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
        <span>REF_{project.id.toUpperCase()}</span>
        <span>{project.meta.type} / {project.meta.year}</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Artwork - Grayscale to Color */}
        <div className="relative aspect-square w-full md:w-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
          <Image
            src={project.artworkSrc}
            alt={project.title}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <button
            onClick={() => isThisPlaying ? stop() : play(project.audioSrc)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="h-12 w-12 border border-white flex items-center justify-center bg-black/60">
              {isThisPlaying ? (
                <div className="h-4 w-4 bg-white" />
              ) : (
                <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tighter text-white uppercase">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] text-white/30 uppercase">{project.meta.region}</p>
          </div>

          <p className="font-mono text-[10px] leading-relaxed text-white/50 uppercase line-clamp-2">
            {project.description}
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => window.open(project.spotifyUrl, "_blank")}
              className="border border-white/10 px-4 py-2 font-mono text-[9px] tracking-widest text-white/40 hover:bg-white hover:text-black transition-colors"
            >
              SPOTIFY_LINK
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-[9px] tracking-widest text-white/20 hover:text-white transition-colors"
            >
              {isExpanded ? "[ CLOSE_LIST ]" : "[ VIEW_TRACKLIST ]"}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 bg-neutral-950/50 p-4">
          <table className="w-full font-mono text-[10px] text-white/40 uppercase">
            <thead>
              <tr className="border-b border-white/5 text-[8px] tracking-widest">
                <th className="text-left pb-2 font-normal">#</th>
                <th className="text-left pb-2 font-normal">TITLE</th>
                <th className="text-right pb-2 font-normal">DUR</th>
              </tr>
            </thead>
            <tbody>
              {project.tracklist.map((track, i) => (
                <tr key={track.title} className="hover:text-white transition-colors">
                  <td className="py-2 opacity-30">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-2">{track.title}</td>
                  <td className="py-2 text-right opacity-50">{track.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
};

export const MusicSection: FC = () => (
  <section
    id="music"
    aria-label="Music projects"
    className="relative flex min-h-screen flex-col bg-black text-neutral-50"
  >
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4 md:px-12">
      <div className="flex justify-between items-baseline">
        <h2 className="text-sm font-mono tracking-[0.5em] text-white uppercase">Archive_02 / Discografía</h2>
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Registros_Audio_NMD</span>
      </div>
    </div>

    <div className="flex-1 grid md:grid-cols-2 border-b border-white/10">
      {PROJECT_PLACEHOLDERS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);
