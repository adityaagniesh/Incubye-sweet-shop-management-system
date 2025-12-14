import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Initialize default admin user
function initializeDefaultAdmin() {
  const usersJson = localStorage.getItem("auth_users");
  if (!usersJson) {
    const defaultUsers = [
      {
        id: "admin_001",
        username: "admin",
        password: "admin123",
        role: "admin",
      },
    ];
    localStorage.setItem("auth_users", JSON.stringify(defaultUsers));
  }
}

const AppRoutes = () => {
  useEffect(() => {
    initializeDefaultAdmin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        }
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
