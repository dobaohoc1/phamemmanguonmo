
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import Landing from "@/pages/LandingPage/Landing";
import Product from "@/pages/LandingPage/Product";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Chatbot from "@/pages/Chatbot";
import Employees from "@/pages/Employees";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Customers from "@/pages/Customers";
import Orders from "@/pages/Orders";
import Reports from "@/pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/san-pham" element={<Product />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/products" element={<Products />} />
                <Route path="/dashboard/customers" element={<Customers />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/reports" element={<Reports />} />
                <Route path="/dashboard/employees" element={<Employees />} />
                <Route path="/dashboard/chatbot" element={<Chatbot />} />
                <Route path="/dashboard/settings" element={<Settings />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
