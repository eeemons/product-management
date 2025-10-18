'use client';

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import ViewToggle from "./ViewToggle";
import Pagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchProductsQuery, useDeleteProductMutation } from "@/lib/features/products/productsSlice";
import Spinner from "../Spinner";
import { Product } from "@/lib/types";
import EditProductModal from "./EditProductModal";
import ConfirmationModal from "../ConfirmationModal";

const ProductsView = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const offset = (currentPage - 1) * productsPerPage;

  const { data: products, isFetching } = useFetchProductsQuery({ offset, limit: productsPerPage });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id).unwrap();
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error('Failed to delete product: ', error);
      }
    }
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // HACK: Assuming 100 total products until the API provides the total count.
  const totalProducts = 100;

  return (
    <div className="flex flex-col relative">
      {isFetching && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10">
          <Spinner />
        </div>
      )}
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} setView={setView} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDeleteClick} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {products?.map((product) => (
                <ProductListItem key={product.id} product={product} onEdit={handleEdit} onDelete={handleDeleteClick} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-auto pt-4">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}
          paginate={paginate}
          currentPage={currentPage}
          setProductsPerPage={setProductsPerPage}
        />
      </div>
      {isEditModalOpen && selectedProduct && (
        <EditProductModal product={selectedProduct} onClose={() => setIsEditModalOpen(false)} />
      )}
      {isDeleteModalOpen && selectedProduct && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${selectedProduct.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default ProductsView;
