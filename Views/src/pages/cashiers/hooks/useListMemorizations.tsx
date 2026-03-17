import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({ isLoadingOpening }: IUseListMemorizations) => {
    const loading = useMemo(() => isLoadingOpening, [isLoadingOpening]);

    return { loading };
};
