import { useQuery } from "@tanstack/react-query";
import API from "../api";
export function useGetSubategoriesOnCategory(categoryID) {
  return useQuery({
    queryKey: ["subcategories", categoryID],
    queryFn: async () => {
      const { data } = await API.get(`/categories/${categoryID}/subcategories`);
      return data.data;
    },
    enabled: !!categoryID,
  });
}
