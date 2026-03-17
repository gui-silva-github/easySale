import { FC } from "react";
import { ProductsTable } from '@/components/table/products/ProductsTable';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const Products: FC = () => {
    useListStates();
    useListCallAPI();
    useListMemorizations({});
    useListFunctions();
    return <ProductsTable />;
};