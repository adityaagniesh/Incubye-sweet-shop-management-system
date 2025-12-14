import { Search, Star, Clock, Truck, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const token = localStorage.getItem("token") || "";
      console.log("Token:", token);
      
      if (!token) {
        console.warn("No auth token found");
      }
      
      const response = await fetch(
        `http://localhost:5000/api/sweets/search?name=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Sweet Cravings,
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              One Click Away
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Discover the finest sweets, manage your orders, and enjoy seamless delivery
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sweets or shops..."
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-800 placeholder-gray-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? "Searching..." : "Find Sweets"}
            </button>
          </form>
        </div>
      </section>

      {/* Featured Section */}
      <section id="sweet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Featured Sweets & Shops</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Gulab Jamun Delight",
              rating: 4.8,
              reviews: 324,
              time: "25-30 min",
              image: "bg-gradient-to-br from-pink-200 to-pink-400",
              category: "Traditional Sweets",
            },
            {
              name: "Barfi Palace",
              rating: 4.7,
              reviews: 512,
              time: "20-25 min",
              image: "bg-gradient-to-br from-yellow-200 to-yellow-400",
              category: "Premium Sweets",
            },
            {
              name: "Laddu House",
              rating: 4.9,
              reviews: 678,
              time: "15-20 min",
              image: "bg-gradient-to-br from-orange-200 to-orange-400",
              category: "Classic Flavors",
            },
            {
              name: "Halwa Corner",
              rating: 4.6,
              reviews: 245,
              time: "30-35 min",
              image: "bg-gradient-to-br from-amber-200 to-amber-400",
              category: "Traditional",
            },
            {
              name: "Mithai Studio",
              rating: 4.9,
              reviews: 891,
              time: "20-25 min",
              image: "bg-gradient-to-br from-rose-200 to-rose-400",
              category: "Artisanal",
            },
            {
              name: "Sweet Fusion",
              rating: 4.7,
              reviews: 456,
              time: "25-30 min",
              image: "bg-gradient-to-br from-fuchsia-200 to-fuchsia-400",
              category: "Modern Sweets",
            },
          ].map((shop, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
            >
              <div className={`${shop.image} h-40 relative overflow-hidden`}>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="font-semibold text-gray-800">{shop.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{shop.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{shop.category}</p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{shop.time}</span>
                  </div>
                  <span className="text-gray-500">{shop.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Sweet Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Laddus", icon: "🎂" },
              { name: "Barfis", icon: "🍬" },
              { name: "Halwas", icon: "🥘" },
              { name: "Jalebis", icon: "🌀" },
              { name: "Pedhas", icon: "⭐" },
              { name: "Kheer", icon: "🥛" },
              { name: "Khichdi", icon: "🍜" },
              { name: "Mithai Mix", icon: "🎁" },
            ].map((category, idx) => (
              <button
                key={idx}
                className="p-6 bg-white rounded-xl hover:bg-orange-50 border-2 border-transparent hover:border-orange-300 transition group text-center"
              >
                <div className="text-4xl mb-3 text-center">{category.icon}</div>
                <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">1000+</h3>
              <p className="text-lg opacity-90">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">50+</h3>
              <p className="text-lg opacity-90">Sweet Shops</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">500+</h3>
              <p className="text-lg opacity-90">Sweet Varieties</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Browse",
              description: "Explore hundreds of sweets from your favorite shops",
              icon: "🔍",
            },
            {
              step: 2,
              title: "Select",
              description: "Choose your favorite sweets and customize your order",
              icon: "🛒",
            },
            {
              step: 3,
              title: "Pay",
              description: "Secure payment with multiple payment options",
              icon: "💳",
            },
            {
              step: 4,
              title: "Enjoy",
              description: "Fast delivery right to your doorstep",
              icon: "🚚",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 text-center h-full">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
              {item.step < 4 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ChevronRight className="text-orange-400" size={32} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready for Sweet Delights?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of sweet lovers and start ordering today
          </p>
          <button className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105 text-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Sweet Lover",
                text: "The fastest delivery and freshest sweets I've ever had! Highly recommended.",
                rating: 5,
              },
              {
                name: "Rajesh Kumar",
                role: "Regular Customer",
                text: "Amazing variety of sweets at great prices. Customer service is excellent!",
                rating: 5,
              },
              {
                name: "Anjali Patel",
                role: "Frequent Buyer",
                text: "Love the convenience of ordering online. The quality never disappoints.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
