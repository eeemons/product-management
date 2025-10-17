"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { logout } from "@/lib/features/auth/authSlice";
import { useFetchProductsQuery } from "@/lib/features/products/productsSlice";

import ProductsView from "@/components/products/ProductsView";

const DashboardPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: products, isLoading } = useFetchProductsQuery();

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
      <header className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <nav>
            <a
              href="/products"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Products
            </a>
          </nav>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          {isLoading || !products ? (
            <p>Loading products...</p>
          ) : (
            <ProductsView products={products} />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
