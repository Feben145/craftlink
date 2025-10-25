"use client";

import { useRouter } from "next/navigation";
import { sampleProducts, Product } from "../../../lib/Product";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/images/logo.png";

import Link from "next/link";

interface ProductDetailsProps {
  params: {
    productsId: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  const router = useRouter();
  const productId = params.productsId;

  console.log("Product ID param:", productId);

  const product: Product | undefined = sampleProducts.find(
    (p) => p.id === productId
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-700">Product not found</h2>
        <Button onClick={() => router.push("/products")} className="ml-4">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 md:px-20">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="EnatCraft logo"
              width={90}
              height={90}
              className="rounded-full"
              priority
            />
            <span className="text-2xl font-bold text-gray-900">EnatCraft</span>
          </Link>

          <div className="flex space-x-4">
            <Button
              asChild
              variant="ghost"
              className="text-gray-700 hover:text-amber-700"
            >
              <Link href="/seller/register">Become a Seller</Link>
            </Button>
            <Button
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/products">Products</Link>
            </Button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex-1">
          <Image
            src={product.path}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-500">({product.reviewCount})</span>
            </div>

            <p className="text-2xl font-bold text-amber-700 mb-4">
              ETB {product.price.toLocaleString()}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Sold by {product.seller.name}, {product.seller.location}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => console.log("Add to cart", product)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
              onClick={() => console.log("Add to wishlist", product)}
            >
              <Heart className="h-4 w-4 mr-1" />
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
