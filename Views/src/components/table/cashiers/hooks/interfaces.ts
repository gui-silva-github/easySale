import type { Cashier } from "@/types/cashiers/responses";

export interface IUseListMemorizations {
    isLoading: boolean;
}

export interface IUseListFunctionsParams {
    setEditing: (value: Cashier | null) => void;
    setOpenCreate: (value: boolean) => void;
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleOpenCreate: () => void;
    handleEdit: (row: Cashier) => void;
    handleCloseCreate: (open: boolean) => void;
    handleCloseEdit: (open: boolean) => void;
};
