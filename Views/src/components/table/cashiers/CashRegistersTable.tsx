import { FC } from "react";
import { PackageIcon, Pencil } from "lucide-react";
import { DataTable, type Column } from '@/components/table/dataTable/DataTable';
import { type Cashier } from "@/types/cashiers/responses";
import { Button } from "@/components/ui/button/Button";
import { CashRegisterModal } from "@/components/modals/cashiers/registerModal/CashRegisterModal";
import { useListStates } from "./hooks/useListStates";
import { useListCallAPI } from "./hooks/useListCallAPI";
import { useListMemorizations } from "./hooks/useListMemorizations";
import { useListFunctions } from "./hooks/useListFunctions";

export const CashRegistersTable: FC = () => {
    const { data, isLoading } = useListCallAPI();
    const { editing, openCreate, setEditing, setOpenCreate } = useListStates();
    const { loading } = useListMemorizations({ isLoading });
    const { handleOpenCreate, handleEdit, handleCloseCreate, handleCloseEdit } = useListFunctions({
        setEditing,
        setOpenCreate,
    });

    const columns: Column<Cashier>[] = [
        { key: 'descricao', header: 'Descrição', sortKey: 'descricao' },
        { key: 'status', header: 'Status' },
        {
            key: 'id',
            header: 'ID',
            render: (r) => r.id.slice(0, 8) + '...',
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Caixas</h2>
                <Button variant="success" onClick={handleOpenCreate}>Novo caixa</Button>
            </div>
            <DataTable<Cashier>
                columns={columns}
                data={data}
                keyExtractor={(r) => r.id}
                loading={loading}
                searchPlaceholder="Buscar por descrição..."
                searchKeys={['descricao', 'status']}
                rowsPerPage={10}
                actions={(row) => (
                    <div className="flex justify-end gap-1">
                        <Button size='icon' variant='ghost' onClick={() => handleEdit(row)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                )}    
            />
            <CashRegisterModal 
                open={openCreate}
                onOpenChange={handleCloseCreate}
                mode="create"
            />
            {editing && (
                <CashRegisterModal 
                    open
                    onOpenChange={handleCloseEdit}
                    mode="edit"
                    caixa={editing}
                />
            )}
        </div>
    );
};
