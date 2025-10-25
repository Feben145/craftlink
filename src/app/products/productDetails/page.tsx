"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Share2,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  seller: {
    id: string;
    name: string;
    location: string;
    email?: string;
    phone?: string;
  };
  rating?: number;
  reviewCount?: number;
  stock: number;
  createdAt: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
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
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data.product);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to sample data if API fails
        setProduct(sampleProduct);
        setReviews(sampleReviews);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      // TODO: Implement actual cart functionality
      console.log("Adding to cart:", { product, quantity });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message (you can replace this with a toast notification)
      alert(`Added ${quantity} ${product.title} to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    // TODO: Implement wishlist functionality
    console.log("Added to wishlist:", product);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-amber-300 mx-auto mb-4" />
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
  const reviewCount = product.reviewCount || 0;

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
            <Link href="/products">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-amber-700"
              >
                Browse Products
              </Button>
            </Link>
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
              <img
                src={product.imageUrl || "/images/placeholder-product.jpg"}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {/* Additional images would go here */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg border-2 border-amber-200"></div>
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg"></div>
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
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
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
                <h3 className="font-semibold text-gray-900 mb-2">Sold by</h3>
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
                    onClick={() => router.push(`/seller/${product.seller.id}`)}
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
                    max={product.stock}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.stock === 0}
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
                    router.push("/checkout");
                  }}
                  disabled={product.stock === 0}
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
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">
                    Handmade with Care
                  </h4>
                  <p className="text-amber-700 text-sm">
                    This product is lovingly handmade by {product.seller.name}{" "}
                    using traditional techniques passed down through
                    generations. Each piece is unique and carries the artisan's
                    personal touch.
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
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Free standard shipping within Ethiopia</li>
                    <li>Delivery time: 3-7 business days</li>
                    <li>Express shipping available at additional cost</li>
                    <li>Tracking number provided for all orders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Returns</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>14-day return policy</li>
                    <li>Items must be in original condition</li>
                    <li>Free return shipping for defective items</li>
                    <li>Contact support for return authorization</li>
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

// Sample data fallback
const sampleProduct: Product = {
  id: "1",
  title: "Traditional Ethiopian Basket",
  description:
    "Handwoven basket with beautiful traditional patterns, perfect for home decor or storage. Each basket is uniquely crafted by skilled artisans using natural materials and traditional weaving techniques that have been passed down through generations.",
  price: 350,
  category: "handmade",
  imageUrl: "/images/placeholder-product.jpg",
  seller: {
    id: "1",
    name: "Elena Crafts",
    location: "Addis Ababa",
    email: "elena@craftlink.com",
    phone: "+251 91 234 5678",
  },
  rating: 4.5,
  reviewCount: 12,
  stock: 15,
  createdAt: "2024-01-15",
};

const sampleReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment:
      "Beautiful craftsmanship! The basket is even more beautiful in person. Perfect for storing fruits and vegetables.",
    userName: "Sarah M.",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    rating: 4,
    comment:
      "Lovely product, arrived quickly. The colors are vibrant and it's very sturdy.",
    userName: "Michael T.",
    createdAt: "2024-01-28",
  },
];
