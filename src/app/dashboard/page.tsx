"use client";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { logout } from "@/lib/features/auth/authSlice";

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

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, User</h2>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
