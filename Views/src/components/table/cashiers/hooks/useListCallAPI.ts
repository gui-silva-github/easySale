import { useGetCashRegisters } from "@/hooks/cashiers/useCashRegisters";

export const useListCallAPI = () => {
    const { data = [], isLoading } = useGetCashRegisters();

    return {
        data,
        isLoading,
    };
};
