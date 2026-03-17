import { useGetAvailableCashRegisters, useGetOpenCashRegisters } from "@/hooks/cashiers/useCashRegisters";

export const useListCallAPI = () => {
    const { data: availableCashRegisters = [], isLoading: loadingAvailableCashRegisters } =
    useGetAvailableCashRegisters();
  const { data: openCashRegisters = [], isLoading: loadingOpenCashRegisters } =
    useGetOpenCashRegisters();

    return {
        availableCashRegisters,
        loadingAvailableCashRegisters,
        openCashRegisters,
        loadingOpenCashRegisters,
    }
}