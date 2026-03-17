import type { Product } from "@/types/products/responses";

export interface IUseListMemorizations {
    isLoading: boolean;
}

export interface IUseListFunctionsParams {
    setEditing: (value: Product | null) => void;
    setDeleteTarget: (value: Product | null) => void;
    setOpenCreate: (value: boolean) => void;
    deleteTarget: Product | null;
    deleteMutation: { mutate: (id: string) => void; isPending: boolean };
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleOpenCreate: () => void;
    handleEdit: (row: Product) => void;
    handleCloseCreate: (open: boolean) => void;
    handleCloseEdit: (open: boolean) => void;
    handleDeleteTarget: (row: Product | null) => void;
    handleCloseDelete: (open: boolean) => void;
    handleConfirmDelete: () => void;
};
