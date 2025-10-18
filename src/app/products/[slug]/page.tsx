'use client';

import { useState, useEffect } from 'react';
import ProductDetails from "@/components/products/ProductDetails";
import Spinner from "@/components/Spinner";
import { useFetchProductBySlugQuery, useUpdateProductMutation, useDeleteProductMutation } from "@/lib/features/products/productsSlice";
import { useParams, useRouter } from "next/navigation";
import EditProductModal from "@/components/products/EditProductModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Product } from "@/lib/types";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof params.slug === 'string' && params.slug !== currentSlug) {
      setCurrentSlug(params.slug);
    }
  }, [params.slug, currentSlug]);

  const { data: product, error, isLoading } = useFetchProductBySlugQuery(currentSlug || '', {
    skip: !currentSlug,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleEdit = (productToEdit: Product) => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (product) {
      try {
        await deleteProduct(product.id).unwrap();
        setIsDeleteModalOpen(false);
        router.push('/products'); // Redirect to products list after deletion
      } catch (error) {
        console.error('Failed to delete product: ', error);
      }
    }
  };

  if (isLoading || !currentSlug) {
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

  return (
    <>
      <ProductDetails key={product.slug} product={product} onEdit={handleEdit} onDelete={handleDeleteClick} />
      {isEditModalOpen && product && (
        <EditProductModal product={product} onClose={() => setIsEditModalOpen(false)} />
      )}
      {isDeleteModalOpen && product && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${product.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
