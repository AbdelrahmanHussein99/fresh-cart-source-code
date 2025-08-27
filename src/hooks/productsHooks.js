import { keepPreviousData, useQuery } from "@tanstack/react-query";
import API from "../api";

export function useGetProducts(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const { data } = await API.get(`/products?page=${page}&limit=${limit}`);
      return data;
    },
    placeholderData: keepPreviousData,
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
