import { useAuth } from "@/contexts/AuthContext";
import Layout from "./Layout";
import { AlertCircle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({
  children,
  requiredRole = "user",
}: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              Go to Home
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (requiredRole === "admin" && user?.role !== "admin") {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Only
            </h1>
            <p className="text-gray-600 mb-6">
              You do not have permission to access this page. Admin access
              required.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              Go to Home
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
}
