'use client';

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { logout } from "@/lib/features/auth/authSlice";
import ProductsView from "@/components/products/ProductsView";
import AddProductModal from "@/components/products/AddProductModal";

const DashboardPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-rich-black border border-transparent rounded-md shadow-sm hover:bg-hooker-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rich-black">
              Add Product
            </button>
          </div>
          <ProductsView />
        </div>
      </main>
      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DashboardPage;