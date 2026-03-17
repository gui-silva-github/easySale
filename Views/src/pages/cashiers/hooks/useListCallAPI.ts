import { useGetOpening } from "@/hooks/cashiers/useCashRegisters";

export const useListCallAPI = (aberturaId: string | null) => {
    const { data: aberturaAtual, isLoading: isLoadingOpening } = useGetOpening(aberturaId, true);

    return {
        aberturaAtual,
        isLoadingOpening,
    };
};
