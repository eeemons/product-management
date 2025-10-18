"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProductMutation } from "@/lib/features/products/productsSlice";
import { useFetchCategoriesQuery } from "@/lib/features/category/categorySlice";
import { Product } from "@/lib/types";
import Spinner from "@/components/Spinner";

interface IFormInput {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string;
}

const EditProductModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategoriesQuery();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
        images: product.images.join(", "),
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const images = data.images.split(",").map((img) => img.trim());
    const productData = { ...data, images, price: Number(data.price) };
    try {
      await updateProduct({ id: product.id, data: productData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update product: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md animate-fade-in-fast">
        <h2 className="text-2xl font-bold text-rich-black mb-6">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField label="Product Name" error={errors.name?.message}>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-md"
            />
          </InputField>
          <InputField label="Description" error={errors.description?.message}>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded-md"
            />
          </InputField>
          <InputField label="Price" error={errors.price?.message}>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded-md"
            />
          </InputField>
          <InputField label="Category" error={errors.categoryId?.message}>
            {isLoadingCategories ? (
              <Spinner size="small" />
            ) : (
              <select
                {...register("categoryId", {
                  required: "Category is required",
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </InputField>
          <InputField
            label="Images (comma separated URLs)"
            error={errors.images?.message}
          >
            <input
              type="text"
              {...register("images", {
                required: "At least one image is required",
              })}
              className="w-full p-2 border rounded-md"
            />
          </InputField>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-rich-black bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md text-white bg-rich-black hover:bg-hooker-green disabled:bg-gray-400 flex items-center gap-2"
            >
              {isLoading && <Spinner size="small" />}{" "}
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default EditProductModal;
