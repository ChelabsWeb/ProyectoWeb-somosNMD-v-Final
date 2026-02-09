export type ArtistEntry = {
    id: string;
    name: string;
    blurb: string;
    imageSrc: string;
    socials: { name: string; url: string }[];
    bio?: string;
    disciplines?: string[];
};

export const ARTISTS: ArtistEntry[] = [
    {
        id: "gervi",
        name: "Gervi",
        blurb: "Beatmaker experimental y arquitecto sonoro.",
        bio: "Explorador de texturas granulares y ritmos rotos. Gervi es el cerebro detrás del diseño sonoro de NOMADES, fusionando lo analógico con procesos digitales avanzados.",
        disciplines: ["Producción", "Diseño Sonoro", "Live Performance"],
        imageSrc: "/assets/artists/Gervi.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/gervi.nmd/" },
            { name: "Spotify", url: "#" },
        ],
    },
    {
        id: "izquierdo",
        name: "Izquierdo",
        blurb: "MC y letrista con barras cinematográficas.",
        bio: "Poeta de la métrica y observador de la realidad urbana. Sus líricas son fragmentos de un cine negro sonoro que define la narrativa de cada expedición.",
        disciplines: ["Composición", "Rap", "Storytelling"],
        imageSrc: "/assets/artists/Izquierdo.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/izquierdo.nmd/" },
        ],
    },
    {
        id: "juanma",
        name: "JuanMa",
        blurb: "Voz principal y compositor del universo NMD.",
        bio: "El núcleo melódico del colectivo. JuanMa despliega un abanico emocional que navega entre el neo-soul y la experimentación vocal más cruda.",
        disciplines: ["Voz", "Composición", "Arreglos"],
        imageSrc: "/assets/artists/JuanMa.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/juanma.nmd/" },
        ],
    },
    {
        id: "caba",
        name: "Caba",
        blurb: "Director creativo y storyteller visual del colectivo.",
        bio: "Arquitecto de la imagen. Caba traduce el sonido en visiones, encargándose de que el universo NOMADES sea tangible a través de la lente.",
        disciplines: ["VFX", "Dirección de Arte", "Fotografía"],
        imageSrc: "/assets/artists/Caba.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/caba.nmd/" },
        ],
    },
    {
        id: "justino",
        name: "Justino",
        blurb: "Productor ejecutivo y guardian del sonido final.",
        bio: "Precisión y balance. Justino supervisa cada fase de la creación técnica, asegurando que la fidelidad sonora sea absoluta en cada entrega.",
        disciplines: ["Mixing", "Mastering", "Executive Prod."],
        imageSrc: "/assets/artists/Justino.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/justino.nmd/" },
        ],
    },
    {
        id: "kenma",
        name: "Kenma",
        blurb: "Productor y beatmaker con ADN trap futurista.",
        bio: "Mecánicas de alta gama. Kenma inyecta velocidad y futurismo en la base rítmica de NOMADES, empujando los límites del género.",
        disciplines: ["Sampling", "Trap Prod.", "Digital Design"],
        imageSrc: "/assets/artists/Kenma.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/kenma.nmd/" },
        ],
    },
    {
        id: "letie",
        name: "Letie",
        blurb: "Cantante neo-soul y curadora de armonías.",
        bio: "Fluidez y elegancia. Letie es la arquitecta de las armonías complejas, aportando una sensibilidad orgánica indispensable en las piezas más densas.",
        disciplines: ["Voz", "Armonización", "Curaduría"],
        imageSrc: "/assets/artists/Letie.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/letie.nmd/" },
        ],
    },
    {
        id: "luccio",
        name: "Luccio",
        blurb: "Demonio atrapado en cuerpo de humano.",
        bio: "Energía pura y caos controlado. Luccio representa el lado más visceral y performativo del colectivo, rompiendo la barrera entre escenario y público.",
        disciplines: ["Performance", "MCing", "Visual Chaos"],
        imageSrc: "/assets/artists/Luccio.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/luccio.nmd/" },
        ],
    },
    {
        id: "luquilla",
        name: "Luquilla",
        blurb: "Diseñadora vocal y exploradora de texturas.",
        bio: "La voz como instrumento plástico. Luquilla procesa y reconstruye su propio sonido para crear atmósferas que desafían la percepción humana.",
        disciplines: ["Vocal FX", "Texturizado", "Performance"],
        imageSrc: "/assets/artists/Luquilla.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/lucaghizzo._.nmd/" },
        ],
    },
    {
        id: "nacht",
        name: "Nacht",
        blurb: "DJ y compositor de atmósferas nocturnas.",
        bio: "Cronista de la oscuridad. Nacht orquestra los viajes nocturnos de NOMADES a través de sets inmersivos y composiciones de larga duración.",
        disciplines: ["DJing", "Composición", "Soundscapes"],
        imageSrc: "/assets/artists/Nacht.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/nacht.nmd/" },
        ],
    },
    {
        id: "nei",
        name: "Nei",
        blurb: "Productora audiovisual y arquitecta del live set.",
        bio: "Ingeniería de la experiencia. Nei diseña los sistemas visuales reactivos que acompañan cada show, haciendo que el sonido se vea.",
        disciplines: ["Streaming", "Live Visuals", "Hardware Tech"],
        imageSrc: "/assets/artists/Nei.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/nei.nmd/" },
        ],
    },
    {
        id: "quei",
        name: "Quei",
        blurb: "Lyricist y curadora de storytelling urbano.",
        bio: "Observadora sharp. Quei decodifica los códigos de la calle para transformarlos en líricas crudas y directas que anclan el sonido en la realidad.",
        disciplines: ["Lírica", "Storytelling", "A&R"],
        imageSrc: "/assets/artists/Quei.jpg",
        socials: [
            { name: "Instagram", url: "https://www.instagram.com/quei.nmd/" },
        ],
    },
];
