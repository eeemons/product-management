"use client";

import { Product } from "@/lib/types";
import { useState } from "react";

const ProductDetails = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || "/placeholder.svg"
  );

  return (
    <div className="min-h-screen bg-flash-white text-rich-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Image Gallery */}
          <div className="lg:col-span-3 flex flex-col gap-4 animate-fade-in">
            <div className="aspect-square w-full overflow-hidden rounded-lg shadow-lg bg-white">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square w-full overflow-hidden rounded-md cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === image
                      ? "border-lion-brown"
                      : "border-transparent hover:border-hooker-green"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 animate-slide-in-left">
            <h1 className="text-4xl font-bold text-rich-black">{product.name}</h1>
            <p className="text-2xl font-semibold text-hooker-green">${product.price?.toFixed(2)}</p>
            
            <div className="prose text-rich-black max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button className="bg-rich-black text-flash-white px-8 py-3 rounded-full font-semibold hover:bg-hooker-green transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Add to Cart
                </button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-rich-black mb-4">Product Details</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span>Added on: {new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <RefreshIcon />
                    <span>Last updated: {new Date(product.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {product.category && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-rich-black mb-4">Category</h3>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow">
                    <img src={product.category.image} alt={product.category.name} className="w-16 h-16 rounded-md object-cover"/>
                    <div>
                        <p className="font-semibold text-rich-black">{product.category.name}</p>
                        <p className="text-xs text-gray-500">{product.category.description}</p>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 12M20 20l-1.5-1.5A9 9 0 003.5 12" />
    </svg>
);

export default ProductDetails;
