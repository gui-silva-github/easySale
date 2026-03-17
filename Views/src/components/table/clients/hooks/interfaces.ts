import type { ClientShort } from "@/types/clients/responses";

export interface IUseListMemorizations {
    isLoading: boolean;
    data: ClientShort[];
    sortKey: string | null;
    sortDir: 'asc' | 'desc' | null;
}

export interface IUseListFunctionsParams {
    setEditing: (value: ClientShort | null) => void;
    setDeleteTarget: (value: ClientShort | null) => void;
    setOpenCreate: (value: boolean) => void;
    setSortKey: (value: string | null) => void;
    setSortDir: (value: 'asc' | 'desc' | null) => void;
    sortKey: string | null;
    sortDir: 'asc' | 'desc' | null;
    deleteTarget: ClientShort | null;
    deleteMutation: { mutate: (id: string) => void; isPending: boolean };
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleOpenCreate: () => void;
    handleEdit: (row: ClientShort) => void;
    handleCloseCreate: (open: boolean) => void;
    handleCloseEdit: (open: boolean) => void;
    handleDeleteTarget: (row: ClientShort | null) => void;
    handleCloseDelete: (open: boolean) => void;
    handleConfirmDelete: () => void;
    handleSort: (key: string) => void;
};
