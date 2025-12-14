import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:inline">
                Sweetly
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-orange-500 font-medium">
                Home
              </a>
              <a href="#sweet" className="text-gray-700 hover:text-orange-500 font-medium">
                Sweets
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium">
                Contact
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:block px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-700"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              <a href="#home" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">
                Home
              </a>
              <a href="#sweet" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">
                Sweets
              </a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">
                About
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">
                Contact
              </a>

              {isLoggedIn ? (
                <>
                  {user?.role === "admin" && (
                    <button
                      onClick={handleAdminClick}
                      className="block w-full text-left py-2 text-gray-700 hover:text-orange-500 font-medium"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
