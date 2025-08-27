import { useQuery } from "@tanstack/react-query";
import API from "../api";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await API.get("/products");
      return data.data;
    },
  });
}

export function useGetProductById(id) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await API.get(`/products/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
