'use client';

import ProductDetails from "@/components/products/ProductDetails";
import Spinner from "@/components/Spinner";
import { useFetchProductBySlugQuery } from "@/lib/features/products/productsSlice";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { data: product, error, isLoading } = useFetchProductBySlugQuery(slug, {
    skip: !slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-flash-white">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-screen bg-flash-white text-rich-black">
        <p>Product not found.</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
