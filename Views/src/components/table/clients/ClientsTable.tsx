import { FC } from 'react';
import { Pencil, Trash2, UsersIcon } from 'lucide-react';
import { DataTable, type Column } from '@/components/table/dataTable/DataTable';
import type { ClientShort } from '@/types/clients/responses';
import { Button } from '@/components/ui/button/Button';
import { ConfirmDialog } from '@/components/ui/confirm/ConfirmDialog';
import { ClientModal } from '@/components/modals/clients/ClientModal';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const ClientsTable: FC = () => {
    const { data, isLoading, deleteMutation } = useListCallAPI();
    const {
        editing,
        deleteTarget,
        openCreate,
        sortKey,
        sortDir,
        setEditing,
        setDeleteTarget,
        setOpenCreate,
        setSortKey,
        setSortDir,
    } = useListStates();
    const { loading, sortedData } = useListMemorizations({
        isLoading,
        data,
        sortKey,
        sortDir,
    });
    const {
        handleOpenCreate,
        handleEdit,
        handleCloseCreate,
        handleCloseEdit,
        handleDeleteTarget,
        handleCloseDelete,
        handleConfirmDelete,
        handleSort,
    } = useListFunctions({
        setEditing,
        setDeleteTarget,
        setOpenCreate,
        setSortKey,
        setSortDir,
        sortKey,
        sortDir,
        deleteTarget,
        deleteMutation,
    });

    const columns: Column<ClientShort>[] = [
        { key: 'nome', header: 'Nome', sortKey: 'nome' },
        { key: 'id', header: 'ID', render: (r) => r.id.slice(0, 8) + '...' }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <h2 className="text-xl font-semibold">Clientes</h2>
                </div>
                <Button variant="success" onClick={handleOpenCreate}>Novo cliente</Button>
            </div>
            <DataTable<ClientShort>
                columns={columns}
                data={sortedData}
                sortKey={sortKey ?? undefined}
                sortDir={sortDir}
                onSort={handleSort}
                keyExtractor={(r) => r.id}
                loading={loading}
                searchPlaceholder="Buscar por nome..."
                searchKeys={['nome']}
                rowsPerPage={10}
                actions={(row) => (
                    <div className="flex justify-end gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(row)}
                        >
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
            <ClientModal
                open={openCreate}
                onOpenChange={handleCloseCreate}
                mode="create"
            />
            {editing && (
                <ClientModal
                    open
                    onOpenChange={handleCloseEdit}
                    mode="edit"
                    client={editing}
                />
            )}
            <ConfirmDialog
                open={!!deleteTarget}
                onOpenChange={handleCloseDelete}
                title="Excluir cliente?"
                description={`Tem certeza que deseja excluir "${deleteTarget?.nome}"?`}
                confirmLabel="Excluir"
                variant="destructive"
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
            />
        </div>
    );
};
