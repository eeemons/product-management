import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query<any, void>({
      query: () => "/categories",
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoriesApi;
