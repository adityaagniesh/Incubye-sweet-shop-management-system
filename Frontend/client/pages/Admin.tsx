import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { LogOut, Package, ShoppingCart, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SweetsManagement from "@/components/SweetsManagement";
import { useEffect, useState } from "react";

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSweets: 0,
    totalQuantity: 0,
    totalValue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/sweets");
      const sweets = await response.json();

      const totalSweets = sweets.length;
      const totalQuantity = sweets.reduce(
        (sum: number, s: any) => sum + s.quantity,
        0
      );
      const totalValue = sweets.reduce(
        (sum: number, s: any) => sum + s.price * s.quantity,
        0
      );

      setStats({ totalSweets, totalQuantity, totalValue });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dashboardStats = [
    {
      icon: Package,
      label: "Total Sweets",
      value: stats.totalSweets.toString(),
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: ShoppingCart,
      label: "Total Quantity",
      value: stats.totalQuantity.toString(),
      color: "from-green-400 to-green-600",
    },
    {
      icon: BarChart3,
      label: "Inventory Value",
      value: `₹${stats.totalValue.toLocaleString()}`,
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, <strong>{user?.username}</strong>!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {dashboardStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Sweets Management Section */}
          <SweetsManagement />
        </div>
      </div>
    </Layout>
  );
}
