import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({ isLoading }: IUseListMemorizations) => {
    const loading = useMemo(() => isLoading, [isLoading]);

    return { loading };
};
