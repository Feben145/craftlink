import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function Home() {
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
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "cr1.jpeg",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empowering{" "}
            <span className="text-amber-300">Women Through Digital</span> Craft
            Markets
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Support local artisans and discover unique handmade products.
            Connect with women artisans who craft beautiful, authentic items
            from the comfort of their homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Link href="/seller/register">Start Selling Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects you with women artisans who craft beautiful,
            authentic items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Artisans Create
            </h3>
            <p className="text-gray-600">
              Women artisans create unique handmade products with traditional
              techniques and modern designs.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              You Discover
            </h3>
            <p className="text-gray-600">
              Browse and discover authentic handmade goods from talented women
              entrepreneurs across Ethiopia.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Support & Empower
            </h3>
            <p className="text-gray-600">
              Every purchase directly supports women artisans and helps grow
              their small businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Discover beautiful handmade items crafted with passion and tradition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Woven Basket",
              price: "960 ETB",
              emoji: "🧺",
              color: "bg-amber-100",
              description: "Handwoven traditional basket",
            },
            {
              name: "Embroidered Cushion",
              price: "1,200 ETB",
              emoji: "🪡",
              color: "bg-orange-100",
              description: "Beautiful embroidered home decor",
            },
            {
              name: "Handmade Pot",
              price: "850 ETB",
              emoji: "🏺",
              color: "bg-red-100",
              description: "Traditional clay pottery",
            },
          ].map((product) => (
            <div
              key={product.name}
              className={`${product.color} rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-amber-200`}
            >
              <div className="text-4xl mb-3">{product.emoji}</div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <p className="text-amber-700 font-bold mt-3 text-xl">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CraftLink?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building more than just a marketplace - we're creating
            opportunities for women to thrive in the digital economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Safe & Secure
            </h3>
            <p className="text-gray-600">
              Verified seller community with secure transactions. Your safety
              and privacy are our top priorities.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Community Support
            </h3>
            <p className="text-gray-600">
              Join a supportive network of women entrepreneurs. Share
              experiences, learn, and grow together.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Grow Your Business
            </h3>
            <p className="text-gray-600">
              Reach customers across Ethiopia. No technical skills needed - we
              make digital selling simple.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You Can Sell
          </h2>
          <p className="text-lg text-gray-600">
            From traditional crafts to homemade food, showcase your talents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Handmade Crafts", emoji: "🧵", color: "bg-amber-100" },
            { name: "Traditional Food", emoji: "🍲", color: "bg-orange-100" },
            { name: "Clothing", emoji: "👗", color: "bg-red-100" },
            { name: "Home Decor", emoji: "🏠", color: "bg-purple-100" },
          ].map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-amber-200`}
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-amber-600 rounded-2xl text-center text-white max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of women who are already building their businesses with
          CraftLink. It's free to get started!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/seller/register">Become a Seller</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-amber-600"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-amber-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sparkles className="h-6 w-6 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">CraftLink</span>
          </div>
          <div className="text-gray-600 text-center md:text-right">
            <p>Empowering women entrepreneurs through digital craft markets</p>
            <p className="text-sm mt-1">
              © 2024 CraftLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
