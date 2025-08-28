import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api";
import toast from "react-hot-toast";

export function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await API.get("/cart");
      return data;
    },
  });
}
export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await API.post("/cart", { productId });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
}
export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await API.delete(`/cart/${id}`);
      return data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["cart"]);
      queryClient.setQueryData(["cart"], data);
      toast.success(`Item removed from cart!`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to remove item");
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, count }) => {
      const { data } = await API.put(`/cart/${productId}`, { count });
      return data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["cart"]);
      queryClient.setQueryData(["cart"], data);
      toast.success(`Cart updated!`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update cart");
    },
  });
}

export function useClearAllCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const data = await API.delete("/cart", { headers: { token } });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`Cart Cleared!`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to clear cart");
    },
  });
}
