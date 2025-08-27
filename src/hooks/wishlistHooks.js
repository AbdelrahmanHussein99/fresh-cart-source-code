import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api";
import toast from "react-hot-toast";
//  const queryClient

export function useGetWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await API.get("/wishlist");
      return data;
    },
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await API.post("/wishlist", { productId });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success(`${data.message} ❤️`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
}

export function useRemoveWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await API.delete(`/wishlist/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Product removed from wishlist 💔");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
}
