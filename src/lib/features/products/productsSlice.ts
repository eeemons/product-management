import { apiSlice } from "../api/apiSlice";
import { Product } from "@/lib/types";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => `products?offset=${offset}&limit=${limit}`,
    }),
    fetchProductBySlug: builder.query<Product, string>({
      query: (slug) => `products/${slug}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductBySlugQuery } = productsApi;