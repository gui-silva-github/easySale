import { FC } from 'react';
import { ClientsTable } from '@/components/table/clients/ClientsTable';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const Clients: FC = () => {
    useListStates();
    useListCallAPI();
    useListMemorizations({});
    useListFunctions();
    return <ClientsTable />;
};