import { useMutation } from "@tanstack/react-query";
import API from "../api";

export function useRegisterAndLogin() {
  return useMutation({
    mutationFn: async ({ url, values }) => {
      const { data } = await API.post(`/auth/${url}`, values);
      return data;
    },
  });
}
