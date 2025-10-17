import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<any, void>({
      query: () => "/products",
    }),
  }),
});

export const { useFetchProductsQuery } = productsApi;