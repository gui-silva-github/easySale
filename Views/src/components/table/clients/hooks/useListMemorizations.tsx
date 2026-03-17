import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({
    isLoading,
    data,
    sortKey,
    sortDir,
}: IUseListMemorizations) => {
    const loading = useMemo(() => isLoading, [isLoading]);

    const sortedData = useMemo(() => {
        if (!sortKey || !sortDir) return data;
        return [...data].sort((a, b) => {
            const va = String((a as Record<string, unknown>)[sortKey] ?? '');
            const vb = String((b as Record<string, unknown>)[sortKey] ?? '');
            const cmp = va.localeCompare(vb);
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [data, sortKey, sortDir]);

    return { loading, sortedData };
};
