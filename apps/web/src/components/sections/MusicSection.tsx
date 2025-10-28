"use client";

import { useState, type FC } from "react";
import { Button } from "@nmd/ui";
import { useAudio } from "@/context/AudioProvider";
import { ParticleBackground } from "@/components/system/ParticleBackground";
import { useReducedMotionPreference } from "@nmd/animation";
import { trackEvent } from "../../lib/analytics";

const PROJECT_PLACEHOLDERS = [
  {
    id: "junta",
    title: "Junta",
    description: "Debut collective album with cinematic trap and neon R&B.",
    artworkSrc: "/assets/artworks/junta-artwork.jpg", // Replace with actual artwork
    audioSrc: "/assets/audio/junta-preview.mp3", // Replace with actual audio file
    spotifyUrl: "https://open.spotify.com/album/123456789", // Replace with actual URL
    tracklist: [
      { title: "Track 1", duration: "3:45" },
      { title: "Track 2", duration: "4:15" },
      { title: "Track 3", duration: "3:30" },
    ],
  },
  {
    id: "midnight-is-close",
    title: "Midnight Is Close",
    description: "Teaser EP unlocking the GTA VI-inspired narrative arc.",
    artworkSrc: "/assets/artworks/midnight-artwork.jpg", // Replace with actual artwork
    audioSrc: "/assets/audio/midnight-preview.mp3", // Replace with actual audio file
    spotifyUrl: "https://open.spotify.com/album/987654321", // Replace with actual URL
    tracklist: [
      { title: "Intro", duration: "1:15" },
      { title: "Midnight", duration: "3:30" },
      { title: "Outro", duration: "1:30" },
    ],
  },
];

const ProjectCard: FC<{ project: typeof PROJECT_PLACEHOLDERS[0] }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { play, stop, isPlaying, nowPlaying } = useAudio();
  const prefersReducedMotion = useReducedMotionPreference();

  const isThisPlaying = isPlaying && nowPlaying === project.audioSrc;

  const handlePlay = () => {
    if (prefersReducedMotion) return;

    if (isThisPlaying) {
      stop();
      trackEvent("audio_preview_stop", { project_id: project.id });
    } else {
      play(project.audioSrc);
      trackEvent("audio_preview_play", { project_id: project.id });
    }
  };

  return (
    <article
      key={project.id}
      className="flex flex-col gap-4 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur"
    >
      <div className="aspect-video rounded-2xl bg-neutral-800/50 relative overflow-hidden">
        <img src={project.artworkSrc} alt={project.title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="text-xl font-medium">{project.title}</h3>
        <p className="mt-3 text-sm text-neutral-400">{project.description}</p>
      </div>
      {isExpanded && (
        <div className="border-t border-neutral-800 pt-4">
          <h4 className="font-semibold mb-2">Tracklist</h4>
          <ul>
            {project.tracklist.map((track, index) => (
              <li key={index} className="flex justify-between text-sm text-neutral-300">
                <span>{track.title}</span>
                <span>{track.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-3 mt-auto pt-4">
        <Button onClick={handlePlay} disabled={prefersReducedMotion}>
          {isThisPlaying ? "Pause" : "Play"} Preview
        </Button>
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Hide" : "View"} Tracklist
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            trackEvent("spotify_cta_click", { project_id: project.id });
            window.open(project.spotifyUrl, "_blank", "noopener,noreferrer");
          }}
        >
          Spotify
        </Button>
      </div>
    </article>
  );
};

/**
 * Placeholder music projects grid.
 */
export const MusicSection: FC = () => (
  <section
    id="music"
    aria-label="Music projects"
    className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 px-6 py-16 text-neutral-50 md:px-12"
  >
    <ParticleBackground />
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Releases
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Listen inside the living music video.
        </h2>
        <p className="text-neutral-300">
          This grid will evolve into animated cards with audio previews powered
          by GSAP timelines and shared hooks.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {PROJECT_PLACEHOLDERS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);
