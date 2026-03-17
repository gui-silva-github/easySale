import type { Product } from "@/types/products/responses";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({
    setEditing,
    setDeleteTarget,
    setOpenCreate,
    deleteTarget,
    deleteMutation,
}: IUseListFunctionsParams) => {
    const handleOpenCreate = () => setOpenCreate(true);

    const handleEdit = (row: Product) => setEditing(row);

    const handleCloseCreate = (open: boolean) => setOpenCreate(open);

    const handleCloseEdit = (open: boolean) => {
        if (!open) setEditing(null);
    };

    const handleDeleteTarget = (row: Product | null) => setDeleteTarget(row);

    const handleCloseDelete = (open: boolean) => {
        if (!open) setDeleteTarget(null);
    };

    const handleConfirmDelete = () => {
        if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    return {
        handleOpenCreate,
        handleEdit,
        handleCloseCreate,
        handleCloseEdit,
        handleDeleteTarget,
        handleCloseDelete,
        handleConfirmDelete,
    };
};
