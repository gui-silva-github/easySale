import { FC } from "react";
import { DataTable, type Column } from '@/components/table/dataTable/DataTable';
import type { Sale } from '@/types/sales/responses';
import { ShoppingCartIcon } from 'lucide-react';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';

export const SalesTable: FC = () => {
    const { data, isLoading } = useListCallAPI();
    const { loading } = useListMemorizations({ isLoading });

    const columns: Column<Sale>[] = [
        { key: 'id', header: 'ID', render: (r) => r.id.slice(0, 8) + '...' },
        { key: 'aberturaCaixaId', header: 'Abertura', render: (r) => (r.aberturaCaixaId ? r.aberturaCaixaId.slice(0, 8) + '...' : '—') },
        {
            key: 'dataVenda',
            header: 'Data',
            render: (r) => new Date(r.dataVenda).toLocaleString('pt-BR'),
        },
        {
            key: 'valorTotal',
            header: 'Total',
            render: (r) =>
                new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(r.itens.reduce((acc, item) => acc + item.subtotal, 0)),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <ShoppingCartIcon className="h-4 w-4" />
                <h2 className="text-xl font-semibold">Vendas</h2>
            </div>
            <p className="text-sm text-slate-500">
                Listagem de todas as vendas realizadas. Para iniciar uma nova venda, acesse Caixas.
            </p>
            <DataTable<Sale>
                columns={columns}
                data={data}
                keyExtractor={(r) => r.id}
                loading={loading}
                searchPlaceholder="Buscar por ID..."
                searchKeys={['id']}
                rowsPerPage={10}
                emptyMessage="Nenhuma venda encontrada. Abra um caixa para iniciar."
            />
        </div>
    );
};
