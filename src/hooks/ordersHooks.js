import { useMutation } from "@tanstack/react-query";
import API from "../api";
const clientUrl = import.meta.env.VITE_CLIENT_URL;
export function useCheckoutSession() {
  return useMutation({
    mutationFn: async ({ cartId, shippingAddress }) => {
      const { data } = await API.post(
        `/orders/checkout-session/${cartId}?url=${clientUrl}`,
        { shippingAddress }
      );
      return data;
    },
  });
}

export function useCashOrder() {
  return useMutation({
    mutationFn: async ({ cartId, shippingAddress }) => {
      const { data } = await API.post(`/orders/${cartId}`, {
        shippingAddress,
      });
      return data;
    },
  });
}
