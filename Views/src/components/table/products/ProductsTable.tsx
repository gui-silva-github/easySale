import { FC } from 'react';
import { PackageIcon, Pencil, Trash2 } from 'lucide-react';
import { DataTable, type Column } from '@/components/table/dataTable/DataTable';
import type { Product } from '@/types/products/responses';
import { Button } from '@/components/ui/button/Button';
import { ConfirmDialog } from '@/components/ui/confirm/ConfirmDialog';
import { ProductModal } from '@/components/modals/products/ProductModal';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const ProductsTable: FC = () => {
    const { data, isLoading, deleteMutation } = useListCallAPI();
    const { editing, deleteTarget, openCreate, setEditing, setDeleteTarget, setOpenCreate } = useListStates();
    const { loading } = useListMemorizations({ isLoading });
    const {
        handleOpenCreate,
        handleEdit,
        handleCloseCreate,
        handleCloseEdit,
        handleDeleteTarget,
        handleCloseDelete,
        handleConfirmDelete,
    } = useListFunctions({
        setEditing,
        setDeleteTarget,
        setOpenCreate,
        deleteTarget,
        deleteMutation,
    });

    const columns: Column<Product>[] = [
        { key: 'nome', header: 'Nome', sortKey: 'nome' },
        { key: 'marca', header: 'Marca' },
        {
            key: 'price',
            header: 'Preço',
            render: (r) =>
                new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(r.preco),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <PackageIcon className="h-4 w-4" />
                    <h2 className="text-xl font-semibold">Produtos</h2>
                </div>
                <Button variant="success" onClick={handleOpenCreate}>Novo produto</Button>
            </div>
            <DataTable<Product>
                columns={columns}
                data={data}
                keyExtractor={(r) => r.id}
                loading={loading}
                searchPlaceholder="Buscar por nome ou marca..."
                searchKeys={['nome', 'marca']}
                rowsPerPage={10}
                actions={(row) => (
                    <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(row)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteTarget(row)}
                        >
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                    </div>
                )}
            />
            <ProductModal
                open={openCreate}
                onOpenChange={handleCloseCreate}
                mode="create"
            />
            {editing && (
                <ProductModal
                    open
                    onOpenChange={handleCloseEdit}
                    mode="edit"
                    product={editing}
                />
            )}
            <ConfirmDialog
                open={!!deleteTarget}
                onOpenChange={handleCloseDelete}
                title="Excluir produto?"
                description={`Tem certeza que deseja excluir "${deleteTarget?.nome}"?`}
                confirmLabel="Excluir"
                variant="destructive"
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
            />
        </div>
    );
};
