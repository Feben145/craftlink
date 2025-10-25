"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Import all your product images
import candle from "../../../../public/images/crcandle.jpg";
import flower from "../../../../public/images/crflower.jpg";
import jewl from "../../../../public/images/crjewl.jpg";
import mat from "../../../../public/images/crmat.jpg";
import vase from "../../../../public/images/crvase.jpg";
import vase2 from "../../../../public/images/crvase2.jpg";
import basket from "../../../../public/images/basket.jpg";
import mesob from "../../../../public/images/mesob.jpg";
import cusion from "../../../../public/images/cushion.jpg";
import cross from "../../../../public/images/cross.jpg";
import scarf from "../../../../public/images/scarf.jpg";
import jebena from "../../../../public/images/jebena.jpg";

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
  path: any; // For Next.js Image component
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

// Sample data matching your products page
const sampleProducts: Product[] = [
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

const sampleReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment:
      "Absolutely beautiful craftsmanship! The attention to detail is remarkable. This piece brings so much warmth to our home.",
    userName: "Sarah M.",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    rating: 4,
    comment:
      "Lovely product, arrived quickly and well-packaged. The colors are even more vibrant in person than in the photos.",
    userName: "Michael T.",
    createdAt: "2024-01-28",
  },
  {
    id: "3",
    rating: 5,
    comment:
      "Authentic and high-quality. You can tell this was made with care and traditional techniques. Will definitely buy again!",
    userName: "Alem T.",
    createdAt: "2024-01-20",
  },
];

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Try to fetch from API first
        if (id && id !== "undefined") {
          try {
            const response = await fetch(`/api/products/${id}`);
            if (response.ok) {
              const data = await response.json();
              setProduct(data.product);
              setReviews(data.reviews || []);
              return;
            }
          } catch (error) {
            console.log("API fetch failed, using sample data");
          }
        }

        // Fallback to sample data - find product by ID
        const foundProduct = sampleProducts.find((p) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setReviews(sampleReviews);
        } else {
          // If no product found, use first sample product
          setProduct(sampleProducts[0]);
          setReviews(sampleReviews);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(sampleProducts[0]);
        setReviews(sampleReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert(`Added ${quantity} ${product.title} to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    alert(`Added ${product.title} to wishlist!`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const averageRating = product.rating || 0;
  const reviewCount = product.reviewCount || reviews.length;

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
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-amber-700"
              onClick={() => router.push("/seller/register")}
            >
              Become a Seller
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-amber-700"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-96 w-full">
                <Image
                  src={product.path}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {/* Additional image thumbnails */}
              <div className="shrink-0 w-20 h-20 bg-gray-100 rounded-lg border-2 border-amber-200 overflow-hidden">
                <Image
                  src={product.path}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Add more thumbnails as needed */}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Actions */}
            <div className="flex items-center justify-between">
              <div className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="h-10 w-10"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleShare}
                  className="h-10 w-10"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    {averageRating.toFixed(1)} ({reviewCount} reviews)
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  In stock
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-700">
                ETB {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">incl. VAT</span>
            </div>

            {/* Seller Info */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Handcrafted by
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-amber-700">
                      {product.seller.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.seller.location}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/seller/${product.id}`)}
                  >
                    View Shop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center"
                    min="1"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="py-3"
                  onClick={() => {
                    handleAddToCart();
                    // router.push("/checkout");
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="h-4 w-4 text-amber-600" />
                Free shipping
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <RotateCcw className="h-4 w-4 text-amber-600" />
                14-day returns
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-4 w-4 text-amber-600" />
                Secure payment
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {[
                { id: "description", label: "Description" },
                { id: "reviews", label: `Reviews (${reviewCount})` },
                { id: "shipping", label: "Shipping & Returns" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-amber-600 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {product.description}
                </p>
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">
                    ✨ Handmade with Care
                  </h4>
                  <p className="text-amber-700 text-sm">
                    This product is lovingly handmade by {product.seller.name}{" "}
                    from {product.seller.location}
                    using traditional techniques passed down through
                    generations. Each piece is unique and carries the artisan's
                    personal touch, supporting women entrepreneurship in
                    Ethiopia.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">
                          {review.userName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-amber-200 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No reviews yet. Be the first to review this product!
                    </p>
                    <Button className="mt-4 bg-amber-600 hover:bg-amber-700">
                      Write a Review
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    🚚 Shipping Information
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Free standard shipping within Ethiopia</li>
                    <li>Delivery time: 3-7 business days</li>
                    <li>Express shipping available at additional cost</li>
                    <li>Tracking number provided for all orders</li>
                    <li>Carefully packaged to preserve handmade quality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    🔄 Returns & Exchanges
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>14-day return policy from delivery date</li>
                    <li>Items must be in original, unused condition</li>
                    <li>Free return shipping for defective items</li>
                    <li>Contact our support team for return authorization</li>
                    <li>Full refund processed within 5 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
