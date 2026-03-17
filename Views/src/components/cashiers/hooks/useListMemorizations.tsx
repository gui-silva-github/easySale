import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({ loadingAvailableCashRegisters, loadingOpenCashRegisters }: IUseListMemorizations) => {
    const loading = useMemo(() => loadingAvailableCashRegisters || loadingOpenCashRegisters, [loadingAvailableCashRegisters, loadingOpenCashRegisters]);
    
    return { loading }
}