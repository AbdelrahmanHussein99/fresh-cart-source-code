//categoriesHooks
import { useQuery } from "@tanstack/react-query";
import API from "../api";
export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await API.get("/categories");
      return data.data;
    },
  });
}

export function useGetCategoryById(id) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const { data } = await API.get(`/categories/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
