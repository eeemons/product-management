'use client';

import { Product } from "@/lib/types";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
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
    <div className="bg-flash-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 ease-in-out transform hover:scale-105 h-full relative">
      <Link href={`/products/${product.slug}`} className="block flex-grow">
        <div className="relative h-24">
          <img
            src={imageUrl}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold text-rich-black truncate">
            {product.name || "Unnamed Product"}
          </h3>
          <p className="text-xs text-hooker-green">
            {product.category?.name || "Uncategorized"}
          </p>
          <p className="text-sm font-bold text-lion-brown mt-auto pt-2">
            ${product.price || 0}
          </p>
        </div>
      </Link>
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMenuOpen(!isMenuOpen); }} className="p-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition-all">
            <BsThreeDotsVertical className="w-5 h-5 text-rich-black" />
        </button>
        {isMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-28 bg-white rounded-md shadow-xl z-10 animate-fade-in-fast ring-1 ring-gray-200">
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

export default ProductCard;