"use client";

import type { FC } from "react";
import { Button } from "@nmd/ui";
import { ParticleBackground } from "@/components/system/ParticleBackground";

export const ContactSection: FC = () => (
  <section
    id="contact"
    aria-label="Collaboration inquiries"
    className="relative overflow-hidden bg-neutral-950 px-6 py-20 text-neutral-50 md:px-12"
  >
    <ParticleBackground />
    <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Collaborate
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Book the collective or start a project.
        </h2>
        <p className="text-neutral-300">
          Contact form and Supabase automation will arrive in Epic 3. For now,
          this section anchors the CTA cadence and prepares the layout for the
          future form.
        </p>
      </header>

      <form className="grid gap-6 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur">
        <div className="grid gap-2">
          <label htmlFor="placeholder-name" className="text-sm uppercase">
            Name
          </label>
          <input
            id="placeholder-name"
            disabled
            placeholder="Coming soon"
            className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-400"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="placeholder-email" className="text-sm uppercase">
            Email
          </label>
          <input
            id="placeholder-email"
            disabled
            placeholder="comingsoon@nmd.world"
            className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-400"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="placeholder-message" className="text-sm uppercase">
            Message
          </label>
          <textarea
            id="placeholder-message"
            disabled
            rows={4}
            placeholder="Tell us about the collaboration"
            className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-400"
          />
        </div>
        <Button type="button" disabled>
          Submit Coming Soon
        </Button>
      </form>
    </div>
  </section>
);
