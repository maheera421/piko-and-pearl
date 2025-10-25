// src/types/index.d.ts

export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    mainHeading?: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
}

export interface Product {
    id: string;
    name: string;
    category: string; // Category ID
    slug: string;
    sku: string;
    description: string;
    price: number;
    previousPrice?: number;
    stock: number;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    featured: boolean;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    rating?: number;
    reviews?: Review[];
}

export interface Review {
    id: string;
    productId: string; // Product ID
    rating: number;
    comment: string;
    createdAt: Date;
}