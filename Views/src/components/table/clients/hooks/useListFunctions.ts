import type { ClientShort } from "@/types/clients/responses";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({
    setEditing,
    setDeleteTarget,
    setOpenCreate,
    setSortKey,
    setSortDir,
    sortKey,
    sortDir,
    deleteTarget,
    deleteMutation,
}: IUseListFunctionsParams) => {
    const handleOpenCreate = () => setOpenCreate(true);

    const handleEdit = (row: ClientShort) => setEditing(row);

    const handleCloseCreate = (open: boolean) => setOpenCreate(open);

    const handleCloseEdit = (open: boolean) => {
        if (!open) setEditing(null);
    };

    const handleDeleteTarget = (row: ClientShort | null) => setDeleteTarget(row);

    const handleCloseDelete = (open: boolean) => {
        if (!open) setDeleteTarget(null);
    };

    const handleConfirmDelete = () => {
        if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    const handleSort = (key: string) => {
        setSortDir(
            sortKey === key
                ? sortDir === 'asc'
                    ? 'desc'
                    : sortDir === 'desc'
                        ? null
                        : 'asc'
                : 'asc'
        );
        setSortKey(sortKey === key && sortDir === 'desc' ? null : key);
    };

    return {
        handleOpenCreate,
        handleEdit,
        handleCloseCreate,
        handleCloseEdit,
        handleDeleteTarget,
        handleCloseDelete,
        handleConfirmDelete,
        handleSort,
    };
};
