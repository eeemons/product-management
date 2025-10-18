"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { logout } from "@/lib/features/auth/authSlice";
import ProductsView from "@/components/products/ProductsView";

const DashboardPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <ProductsView />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
