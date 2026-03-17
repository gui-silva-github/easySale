import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({ loading = false }: IUseListMemorizations) => {
    const isLoading = useMemo(() => loading, [loading]);
    return { loading: isLoading };
};
