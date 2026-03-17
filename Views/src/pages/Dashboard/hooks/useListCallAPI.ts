import { useGetClients } from "@/hooks/clients/useClients";
import { useGetProducts } from "@/hooks/products/useProducts";
import { useGetCashRegisters } from "@/hooks/cashiers/useCashRegisters";

export const useListCallAPI = () => {
    const { data: clients = [], isLoading: loadingClients } = useGetClients();
    const { data: products = [], isLoading: loadingProducts } = useGetProducts();
    const { data: cashiers = [], isLoading: loadingCashiers } = useGetCashRegisters();

    return {
        clients,
        loadingClients,
        products,
        loadingProducts,
        cashiers,
        loadingCashiers,
    };
};
