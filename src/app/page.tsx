import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">CraftLink</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/seller/register">
              <Button variant="ghost">Become a Seller</Button>
            </Link>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering{" "}
            <span className="text-purple-600">Women Entrepreneurs</span> in
            Ethiopia
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Sell your handmade goods, traditional food, and beautiful clothing
            from the comfort of your home. Join a community that supports and
            celebrates women&apos;s creativity and entrepreneurship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link href="/seller/register">Start Selling Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CraftLink?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re building more than just a marketplace - we&apos;re
            creating opportunities for women to thrive in the digital economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
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
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-pink-600" />
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
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
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
            { name: "Handmade Crafts", emoji: "🧵", color: "bg-yellow-100" },
            { name: "Traditional Food", emoji: "🍲", color: "bg-green-100" },
            { name: "Clothing", emoji: "👗", color: "bg-blue-100" },
            { name: "Home Decor", emoji: "🏠", color: "bg-purple-100" },
          ].map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition-shadow`}
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-purple-600 rounded-2xl text-center text-white max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of women who are already building their businesses with
          CraftLink. It&apos;s free to get started!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/seller/register">Become a Seller</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">CraftLink</span>
          </div>
          <div className="text-gray-600 text-center md:text-right">
            <p>Empowering women entrepreneurs across Ethiopia</p>
            <p className="text-sm mt-1">
              © 2024 CraftLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
