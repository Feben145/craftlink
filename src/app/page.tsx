import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Sparkles,
  ShoppingBag,
  Heart,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../public/images/logo.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50">
      <nav className="container mx-auto px-4 py-4 mb-8 border-b border-amber-200">
        <div className="flex justify-between items-center">
          {/* --- Logo --- */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="EnatCraft logo"
              width={60}
              height={60}
              className="rounded-full"
              priority
            />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              EnatCraft
            </span>
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex space-x-4">
            <Button
              asChild
              variant="ghost"
              className="text-gray-700 hover:text-amber-700"
            >
              <Link href="/seller/register">Seller</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-gray-700 hover:text-amber-700"
            >
              <Link href="/about">About</Link>
            </Button>
            <Button
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/products">Products</Link>
            </Button>
          </div>

          {/* --- Mobile Menu Icon --- */}
          <div className="md:hidden flex items-center">
            <Menu className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </nav>

      {/* ---------------- Hero Section ---------------- */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/cr1.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering{" "}
            <span className="text-amber-300">Women Through Digital</span> Craft
            Markets
          </h1>
          <p className="text-xl mb-8 leading-relaxed text-amber-100">
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
              className="border-white  hover:bg-white text-amber-600"
            >
              <Link href="/seller/register">Start Selling Today</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* ---------------- How It Works ---------------- */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects you with women artisans who craft beautiful,
            authentic items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Sparkles className="h-8 w-8 text-amber-600" />,
              title: "Artisans Create",
              desc: "Women artisans create unique handmade products with traditional techniques and modern designs.",
              bg: "bg-amber-100",
            },
            {
              icon: <ShoppingBag className="h-8 w-8 text-orange-600" />,
              title: "You Discover",
              desc: "Browse and discover authentic handmade goods from talented women entrepreneurs across Ethiopia.",
              bg: "bg-orange-100",
            },
            {
              icon: <Heart className="h-8 w-8 text-red-600" />,
              title: "Support & Empower",
              desc: "Every purchase directly supports women artisans and helps grow their small businesses.",
              bg: "bg-red-100",
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div
                className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ---------------- Featured Products ---------------- */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Discover beautiful handmade items crafted with passion and
            tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Woven Basket",
              price: "960 ETB",
              emoji: "🧺",
              bg: "bg-amber-100",
              desc: "Handwoven traditional basket.",
            },
            {
              name: "Embroidered Cushion",
              price: "1,200 ETB",
              emoji: "🪡",
              bg: "bg-orange-100",
              desc: "Beautiful embroidered home décor.",
            },
            {
              name: "Handmade Pot",
              price: "850 ETB",
              emoji: "🏺",
              bg: "bg-red-100",
              desc: "Traditional clay pottery.",
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`${p.bg} rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-amber-200`}
            >
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="font-semibold text-gray-900 text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
              <p className="text-amber-700 font-bold mt-3 text-xl">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ---------------- Why Choose Us ---------------- */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EnatCraft?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re creating opportunities for women to thrive in the digital
            economy — not just a marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Shield className="h-8 w-8 text-amber-600" />,
              title: "Safe & Secure",
              desc: "Verified seller community with secure transactions. Your safety and privacy are our top priorities.",
              bg: "bg-amber-100",
            },
            {
              icon: <Users className="h-8 w-8 text-orange-600" />,
              title: "Community Support",
              desc: "Join a network of women entrepreneurs. Share experiences, learn, and grow together.",
              bg: "bg-orange-100",
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-red-600" />,
              title: "Grow Your Business",
              desc: "Reach customers across Ethiopia — we make digital selling simple and accessible.",
              bg: "bg-red-100",
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div
                className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ---------------- Categories ---------------- */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You Can Sell
          </h2>
          <p className="text-lg text-gray-600">
            From traditional crafts to homemade food — showcase your talents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Handmade Crafts", emoji: "🧵", bg: "bg-amber-100" },
            { name: "Traditional Food", emoji: "🍲", bg: "bg-orange-100" },
            { name: "Clothing", emoji: "👗", bg: "bg-red-100" },
            { name: "Home Decor", emoji: "🏠", bg: "bg-purple-100" },
          ].map((c) => (
            <div
              key={c.name}
              className={`${c.bg} rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-amber-200`}
            >
              <div className="text-4xl mb-3">{c.emoji}</div>
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* ---------------- Call to Action ---------------- */}
      <section className="container mx-auto px-4 py-16 bg-amber-600 rounded-2xl text-center text-white max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of women already building their businesses with
          EnatCraft. It’s free to get started!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/seller/register">Sell</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white  hover:bg-white text-amber-600"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </section>
      {/* ---------------- Footer ---------------- */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-amber-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="EnatCraft logo"
              width={90}
              height={90}
              className="rounded-full"
              priority
            />
            <span className="text-xl font-bold text-gray-900">EnatCraft</span>
          </div>
          <div className="text-gray-600 text-center md:text-right">
            <p>Empowering women entrepreneurs through digital craft markets</p>
            <p className="text-sm mt-1">
              © {new Date().getFullYear()} EnatCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
