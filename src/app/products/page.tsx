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
  rating?: number;
  reviewCount?: number;
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">CraftLink</span>
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
                  <img
                    src={product.imageUrl || "/images/crflower/.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Category Tag - Replaced Badge with simple div */}
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3
                      className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-amber-700 line-clamp-2"
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
                              i < Math.floor(product.rating!)
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

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-amber-700">
                        ETB {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
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
const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Traditional Ethiopian Basket",
    description:
      "Handwoven basket with beautiful traditional patterns, perfect for home decor or storage.",
    price: 350,
    category: "handmade",
    seller: {
      name: "Elena Crafts",
      location: "Addis Ababa",
    },
    rating: 4.5,
    reviewCount: 12,
  },
  {
    id: "2",
    title: "Handmade Leather Bag",
    description:
      "Genuine leather bag with traditional embroidery, crafted by skilled artisans.",
    price: 850,
    category: "clothing",
    seller: {
      name: "Marta Leatherworks",
      location: "Hawassa",
    },
    rating: 4.8,
    reviewCount: 8,
  },
  {
    id: "3",
    title: "Silver Ethiopian Cross",
    description:
      "Beautiful silver cross pendant with traditional Ethiopian design.",
    price: 450,
    category: "jewelry",
    seller: {
      name: "Selam Silver",
      location: "Bahir Dar",
    },
    rating: 4.3,
    reviewCount: 15,
  },
  {
    id: "4",
    title: "Embroidered Cushion Cover",
    description:
      "Colorful hand-embroidered cushion cover with traditional motifs.",
    price: 280,
    category: "home decor",
    seller: {
      name: "Hana Textiles",
      location: "Addis Ababa",
    },
    rating: 4.6,
    reviewCount: 6,
  },
  {
    id: "5",
    title: "Clay Coffee Pot (Jebena)",
    description:
      "Traditional clay coffee pot used in authentic Ethiopian coffee ceremonies.",
    price: 650,
    category: "handmade",
    seller: {
      name: "Kaleb Pottery",
      location: "Dire Dawa",
    },
    rating: 4.7,
    reviewCount: 20,
  },
  {
    id: "6",
    title: "Handwoven Scarf",
    description:
      "Soft cotton scarf with traditional patterns, perfect for any occasion.",
    price: 320,
    category: "clothing",
    seller: {
      name: "Weini Weaves",
      location: "Mekele",
    },
    rating: 4.4,
    reviewCount: 9,
  },
];
