//categoriesHooks
import { useQuery } from "@tanstack/react-query";
import API from "../api";
export function useGetBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await API.get("/brands");
      return data.data;
    },
  });
}

export function useGetBrandById(id) {
  return useQuery({
    queryKey: ["brands", id],
    queryFn: async () => {
      const { data } = await API.get(`/brands/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
