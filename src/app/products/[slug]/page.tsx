'use client';

import { useState } from 'react';
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
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { data: product, error, isLoading } = useFetchProductBySlugQuery(slug, {
    skip: !slug,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleEdit = (productToEdit: Product) => {
    // The product is already available from the query, so we just open the modal
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

  return (
    <>
      <ProductDetails product={product} onEdit={handleEdit} onDelete={handleDeleteClick} />
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