// products.ts
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import candle from "../../public/images/crcandle.jpg";
import flower from "../../public/images/crflower.jpg";
import jewl from "../../public/images/crjewl.jpg";
import mat from "../../public/images/crmat.jpg";
import vase from "../../public/images/crvase.jpg";
import vase2 from "../../public/images/crvase2.jpg";
import basket from "../../public/images/basket.jpg";
import mesob from "../../public/images/mesob.jpg";
import cusion from "../../public/images/cushion.jpg";
import cross from "../../public/images/cross.jpg";
import scarf from "../../public/images/scarf.jpg";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  seller: {
    name: string;
    location: string;
  };
  rating: number;
  reviewCount?: number;
  path: string | StaticImport;
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Traditional Ethiopian Basket (Mesob)",
    description:
      "Beautifully handwoven basket made with colorful grass reeds — perfect for serving or as a centerpiece.",
    price: 350,
    category: "handmade",
    seller: { name: "Elena Crafts", location: "Addis Ababa" },
    rating: 4.5,
    reviewCount: 12,
    path: basket,
  },
  {
    id: "2",
    title: "Handcrafted Beeswax Candle Set",
    description:
      "Aromatic handmade candles from natural beeswax — add warmth and serenity to your home.",
    price: 280,
    category: "home decor",
    seller: { name: "Marta Candles", location: "Hawassa" },
    rating: 4.7,
    reviewCount: 10,
    path: candle,
  },
  {
    id: "3",
    title: "Silver Ethiopian Cross Pendant",
    description:
      "Elegant sterling silver cross pendant inspired by ancient Ethiopian designs.",
    price: 450,
    category: "jewelry",
    seller: { name: "Selam Silver", location: "Bahir Dar" },
    rating: 4.8,
    reviewCount: 15,
    path: cross,
  },
  {
    id: "4",
    title: "Hand-Embroidered Cushion Cover",
    description:
      "Vibrant cushion cover hand-stitched with traditional motifs — perfect for brightening your space.",
    price: 320,
    category: "home decor",
    seller: { name: "Hana Textiles", location: "Addis Ababa" },
    rating: 4.6,
    reviewCount: 8,
    path: cusion,
  },
  {
    id: "5",
    title: "Clay Coffee Pot (Jebena)",
    description:
      "Authentic handmade clay coffee pot used in Ethiopian coffee ceremonies.",
    price: 650,
    category: "handmade",
    seller: { name: "Kaleb Pottery", location: "Dire Dawa" },
    rating: 4.9,
    reviewCount: 20,
    path: mat,
  },
  {
    id: "6",
    title: "Handwoven Cotton Scarf (Netela)",
    description:
      "Soft and lightweight scarf woven from pure cotton — elegant and comfortable for any occasion.",
    price: 300,
    category: "clothing",
    seller: { name: "Weini Weaves", location: "Mekele" },
    rating: 4.4,
    reviewCount: 9,
    path: scarf,
  },
  {
    id: "7",
    title: "Decorative Flower Pot",
    description:
      "Hand-painted ceramic pot perfect for small plants or floral arrangements.",
    price: 400,
    category: "home decor",
    seller: { name: "Rahel Ceramics", location: "Adama" },
    rating: 4.5,
    reviewCount: 11,
    path: flower,
  },
  {
    id: "8",
    title: "Colorful Woven Mat",
    description:
      "Durable handwoven mat made from natural fibers — adds color and tradition to your space.",
    price: 500,
    category: "home decor",
    seller: { name: "Lensa Crafts", location: "Jimma" },
    rating: 4.3,
    reviewCount: 7,
    path: mat,
  },
  {
    id: "9",
    title: "Traditional Serving Mesob",
    description:
      "Intricately woven serving table (Mesob) — iconic Ethiopian craftsmanship symbolizing unity and culture.",
    price: 1200,
    category: "handmade",
    seller: { name: "Genet Artisans", location: "Addis Ababa" },
    rating: 4.9,
    reviewCount: 18,
    path: mesob,
  },
];
