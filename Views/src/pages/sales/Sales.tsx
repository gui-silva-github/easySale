import { FC } from "react";
import { SalesTable } from '@/components/table/sales/SalesTable';
import { useListStates } from './Sales/hooks/useListStates';
import { useListCallAPI } from './Sales/hooks/useListCallAPI';
import { useListMemorizations } from './Sales/hooks/useListMemorizations';
import { useListFunctions } from './Sales/hooks/useListFunctions';

export const Sales: FC = () => {
    useListStates();
    useListCallAPI();
    useListMemorizations({});
    useListFunctions();
    return <SalesTable />;
};