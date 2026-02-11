import { Product, Beat } from "../lib/shop-types";

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "m1",
        title: "NMD Archive Tee",
        description: "Premium heavyweight cotton tee with high-density 'NOMADES' print on chest.",
        category: "merch",
        price: 45,
        images: ["/assets/shop/tee.png"],
        variants: [
            { name: "Size", options: ["S", "M", "L", "XL"] }
        ],
        stockStatus: "in-stock"
    },
    {
        id: "m2",
        title: "Ghost Hoodie",
        description: "Distressed oversized hoodie with reflective embroidery.",
        category: "merch",
        price: 85,
        images: ["/assets/shop/hoodie.png"],
        variants: [
            { name: "Size", options: ["S", "M", "L", "XL"] }
        ],
        stockStatus: "low-stock"
    },
    {
        id: "f1",
        title: "NMD Work Console",
        description: "Industrial grade studio desk designed for ergonomic music production.",
        category: "furniture",
        price: 890,
        images: ["/assets/shop/mesa.png"],
        stockStatus: "in-stock"
    }
];

export const MOCK_BEATS: Beat[] = [
    {
        id: "b3",
        title: "CARDO",
        producer: "Caba",
        bpm: 144,
        key: "A#m",
        tags: ["NMD", "Experimental", "Deep"],
        previewUrl: "/assets/audio/samples/cardo_144_caba.wav",
        artworkUrl: "/assets/shop/beats_cover.png",
        priceTiers: [
            { name: "Basic", price: 29.99, features: ["MP3", "2000 Radio Plays"] },
            { name: "Premium", price: 49.99, features: ["WAV", "Unlimited Plays"] },
            { name: "Unlimited", price: 199.99, features: ["Stems", "Exclusive"] }
        ]
    },
    {
        id: "b4",
        title: "FARDO",
        producer: "Caba",
        bpm: 140,
        key: "F#m",
        tags: ["NMD", "Atmospheric", "Raw"],
        previewUrl: "/assets/audio/samples/fardo_140_caba.wav",
        artworkUrl: "/assets/shop/beats_cover.png",
        priceTiers: [
            { name: "Basic", price: 29.99, features: ["MP3", "2000 Radio Plays"] },
            { name: "Premium", price: 49.99, features: ["WAV", "Unlimited Plays"] },
            { name: "Unlimited", price: 199.99, features: ["Stems", "Exclusive"] }
        ]
    }
];
