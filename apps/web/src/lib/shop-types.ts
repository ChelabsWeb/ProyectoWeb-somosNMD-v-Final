export type ShopCategory = "merch" | "furniture" | "beats";

export interface Product {
    id: string;
    title: string;
    description: string;
    category: "merch" | "furniture";
    price: number;
    images: string[];
    variants?: {
        name: string;
        options: string[];
    }[];
    stockStatus: "in-stock" | "low-stock" | "out-of-stock";
}

export interface Beat {
    id: string;
    title: string;
    producer: string;
    bpm: number;
    key: string;
    tags: string[];
    previewUrl: string;
    artworkUrl: string;
    priceTiers: {
        name: string;
        price: number;
        features: string[];
    }[];
}

export interface CartItem {
    id: string;
    uniqueId: string; // for physical items it can be id+variant, for beats it can be id+tier
    title: string;
    price: number;
    image: string;
    type: "physical" | "digital";
    quantity: number;
    category?: ShopCategory;
    variantSelection?: string;
    priceTierSelection?: string;
}
