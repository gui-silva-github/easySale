import { useGetProducts, useDeleteProduct } from "@/hooks/products/useProducts";

export const useListCallAPI = () => {
    const { data = [], isLoading } = useGetProducts();
    const deleteMutation = useDeleteProduct();

    return {
        data,
        isLoading,
        deleteMutation,
    };
};
