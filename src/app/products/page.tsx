"use client";

import { useFetchProductsQuery } from "@/lib/features/products/productsSlice";

const ProductsPage = () => {
  const { data: products, error, isLoading } = useFetchProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
