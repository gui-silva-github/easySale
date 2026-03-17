import { useMemo } from "react";
import { IUseListMemorizations } from "./interfaces";

export const useListMemorizations = ({ sale }: IUseListMemorizations) => {
    const totalItens = useMemo(
        () => sale?.itens?.reduce((acc, item) => acc + item.subtotal, 0) ?? 0,
        [sale]
    );

    return { totalItens };
};
