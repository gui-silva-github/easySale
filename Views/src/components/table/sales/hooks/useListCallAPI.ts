import { useGetSales } from "@/hooks/sales/useSales";

export const useListCallAPI = () => {
    const { data = [], isLoading } = useGetSales();

    return {
        data,
        isLoading,
    };
};
