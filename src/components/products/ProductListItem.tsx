'use client';

import { Product } from "@/lib/types";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductListItem = ({ product, onEdit, onDelete }: ProductListItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.svg";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-flash-white rounded-lg shadow-md flex transition-shadow duration-200 ease-in-out hover:shadow-xl items-center relative">
      <Link href={`/products/${product.slug}`} className="flex items-center flex-grow">
        <div className="relative w-20 h-20 flex-shrink-0">
          <img
            src={imageUrl}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="p-2 flex flex-col min-w-0">
          <h3 className="text-sm font-semibold text-rich-black truncate">
            {product.name || "Unnamed Product"}
          </h3>
          <p className="text-xs text-hooker-green truncate">
            {product.category?.name || "Uncategorized"}
          </p>
          <p className="text-sm font-bold text-lion-brown mt-auto">
            ${product.price || 0}
          </p>
        </div>
      </Link>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-50" ref={menuRef}>
        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMenuOpen(!isMenuOpen); }} className="p-1 rounded-full hover:bg-gray-200 transition-all">
            <BsThreeDotsVertical className="w-5 h-5 text-rich-black" />
        </button>
        {isMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-28 bg-white rounded-md shadow-xl z-50 animate-fade-in-fast ring-1 ring-gray-200">
                <div className="py-1">
                    <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEdit(product); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-rich-black hover:bg-flash-white">
                        Edit
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(product); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-chestnut-red hover:bg-flash-white">
                        Delete
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductListItem;