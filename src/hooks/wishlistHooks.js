import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api";
import toast from "react-hot-toast";
//  const queryClient
const token = localStorage?.getItem("userToken");

export function useGetWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await API.get("/wishlist", { headers: { token } });
      return data;
    },
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await API.post(
        "/wishlist",
        { productId },
        {
          headers: { token },
        }
      );
      console.log(data);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["wishlist"], data);
      toast.success(data.message);
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
      const { data } = await API.delete(`/wishlist/${productId}`, {
        headers: { token },
      });
      return data;
    },
    onSuccess: () => {
      // queryClient.setQueryData(["wishlist"], data);
      queryClient.invalidateQueries("wishlist");
      toast.success("Product removed from wishlist");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
}
