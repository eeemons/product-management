import { Product } from "@/lib/types";
import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useFetchProductsQuery } = productsApi;