"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  Loader2,
} from "lucide-react";
import candle from "../../../public/images/crcandle.jpg";
import flower from "../../../public/images/crflower.jpg";
import jewl from "../../../public/images/crjewl.jpg";
import mat from "../../../public/images/crmat.jpg";
import vase from "../../../public/images/crvase.jpg";
import vase2 from "../../../public/images/crvase2.jpg";
import basket from "../../../public/images/basket.jpg";
import mesob from "../../../public/images/mesob.jpg";
import cusion from "../../../public/images/cushion.jpg";
import cross from "../../../public/images/cross.jpg";
import scarf from "../../../public/images/scarf.jpg";
import jebena from "../../../public/images/jebena.jpg";

import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
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

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "all",
    "handmade",
    "clothing",
    "food",
    "home decor",
    "jewelry",
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to sample data if API fails
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        // Assuming newer products have higher IDs - adjust based on your data
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log("Added to cart:", product);
  };

  const handleAddToWishlist = (product: Product) => {
    // TODO: Implement wishlist functionality
    console.log("Added to wishlist:", product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">
            Loading beautiful handmade products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">enatCraft</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/seller/register">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-amber-700"
              >
                Become a Seller
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-amber-700"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Handmade Treasures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support women artisans and find unique, authentic handmade products
            crafted with passion and tradition.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 w-full lg:w-auto"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div
                  className="relative h-64 bg-gray-100 cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <Image
                    src={product?.path || candle}
                    alt={product.title}
                    fill
                    className="object-cover w-full h-full rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                    >
                      <Heart className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Title & Description */}
                  <div className="mb-3">
                    <h3
                      className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-amber-700 line-clamp-2 transition-colors"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>By {product.seller.name}</span>
                    <span>{product.seller.location}</span>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({product.reviewCount || 0})
                      </span>
                    </div>
                  )}

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-bold text-amber-700">
                      ETB {product.price.toLocaleString()}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white transition"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50 transition"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

// Sample data fallback
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
    path: jebena,
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
