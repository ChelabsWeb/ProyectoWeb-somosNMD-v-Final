import { ARTISTS } from "@/data/artists";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type FC } from "react";

interface ArtistPageProps {
    params: { id: string };
}

export async function generateStaticParams() {
    return ARTISTS.map((artist) => ({
        id: artist.id,
    }));
}

const ArtistPage: FC<ArtistPageProps> = ({ params }) => {
    const artist = ARTISTS.find((a) => a.id === params.id);

    if (!artist) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black">
            {/* Archival Toolbar */}
            <nav className="sticky top-0 z-[100] flex justify-between border-b border-white/10 bg-black/80 p-4 text-[9px] tracking-[0.4em] backdrop-blur-md">
                <Link href="/" className="hover:text-white transition-colors">
                    [ BACK_TO_ROOT ]
                </Link>
                <div className="flex gap-12">
                    <span>{artist.name}_SYSTEM_DOSSIER</span>
                    <span className="hidden md:inline">VER_2024.0.1</span>
                </div>
                <div className="flex gap-4">
                    {artist.socials.map(s => (
                        <a key={s.name} href={s.url} target="_blank" className="hover:italic transition-all">{s.name}</a>
                    ))}
                </div>
            </nav>

            <div className="mx-auto flex max-w-7xl flex-col md:flex-row min-h-[calc(100vh-42px)]">
                {/* Left Column: Technical Data */}
                <aside className="w-full border-white/10 p-8 md:w-96 md:border-r space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-[10px] tracking-[0.5em] text-white/30">IDENT_DATA</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-white/5 py-2">
                                <span className="text-white/20">NAME:</span>
                                <span>{artist.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 py-2">
                                <span className="text-white/20">ID:</span>
                                <span>00_{artist.id.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 py-2">
                                <span className="text-white/20">STATUS:</span>
                                <span className="text-green-500">ACTIVE</span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-[10px] tracking-[0.5em] text-white/30">DISCIPLINES</h2>
                        <ul className="space-y-1 text-xs">
                            {artist.disciplines?.map(d => (
                                <li key={d} className="flex items-center gap-2">
                                    <span className="h-1 w-1 bg-white" />
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="h-48 w-full border border-white/5 bg-neutral-950 flex items-center justify-center p-4">
                            <div className="h-full w-full border border-white/10 flex flex-col items-center justify-center gap-2 opacity-20">
                                <div className="h-1 w-32 bg-white/20 animate-pulse" />
                                <div className="h-1 w-24 bg-white/20 animate-pulse" />
                                <div className="h-1 w-28 bg-white/20 animate-pulse" />
                                <span className="text-[7px] mt-2">DÉCODAGE_TERMINAL...</span>
                            </div>
                        </div>
                    </section>
                </aside>

                {/* Right Column: Visual & Bio */}
                <div className="flex-1">
                    <div className="relative aspect-video w-full overflow-hidden grayscale border-b border-white/10 group">
                        <Image
                            src={artist.imageSrc}
                            alt={artist.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-8 left-8">
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase">{artist.name}</h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-16 space-y-12">
                        <section className="max-w-2xl space-y-6">
                            <h2 className="text-[10px] tracking-[0.5em] text-white/30 border-b border-white/10 pb-2">STORY_LOG</h2>
                            <p className="text-lg md:text-2xl leading-relaxed text-white/80 lowercase italic font-serif">
                                {artist.bio || artist.blurb}
                            </p>
                        </section>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-40">
                            <div className="h-32 border border-white/10 bg-white/5" />
                            <div className="h-32 border border-white/10 bg-white/5" />
                            <div className="h-32 border border-white/10 bg-white/5" />
                            <div className="h-32 border border-white/10 bg-white/5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer System Label */}
            <footer className="border-t border-white/10 p-4 text-center text-[8px] tracking-[0.5em] text-white/10 italic">
                NOMADES_UNIT_SYSTEM // EXPÉDIENT_D’ARTISTE_INTERNE_AUTORISÉ
            </footer>
        </main>
    );
};

export default ArtistPage;
