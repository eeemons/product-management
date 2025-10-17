"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import ViewToggle from "./ViewToggle";
import Pagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsViewProps {
  products: Product[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex flex-col">
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
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {currentProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-auto pt-4">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
          setProductsPerPage={setProductsPerPage}
        />
      </div>
    </div>
  );
};

export default ProductsView;
