import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({
    loadingClients,
    loadingProducts,
    loadingCashiers,
}: IUseListMemorizations) => {
    const loading = useMemo(
        () => loadingClients || loadingProducts || loadingCashiers,
        [loadingClients, loadingProducts, loadingCashiers]
    );

    return { loading };
};
