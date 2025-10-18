import { apiSlice } from "../api/apiSlice";
import { Product } from "@/lib/types";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => `products?offset=${offset}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    fetchProductBySlug: builder.query<Product, string>({
      query: (slug) => `products/${slug}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductBySlugQuery, useCreateProductMutation } = productsApi;
