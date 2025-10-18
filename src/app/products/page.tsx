"use client";

import { useFetchProductsQuery } from "@/lib/features/products/productsSlice";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useFetchProductsQuery({ offset: 0, limit: 10 });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading products...
      </div>
    );
  }

  if (error) {
    // Handle both known and unknown error types
    const errorMessage =
      (error as any)?.data?.message ||
      (error as any)?.error ||
      "Something went wrong while fetching products.";

    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {errorMessage}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="my-4 text-3xl font-bold text-center text-gray-800">
        Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any, index: number) => (
          <motion.div
            key={product.id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-1">
              Price:{" "}
              <span className="font-medium text-gray-700">
                ${product.price ?? "N/A"}
              </span>
            </p>
            {product.category && (
              <p className="text-sm text-gray-400">
                Category: {product.category}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
