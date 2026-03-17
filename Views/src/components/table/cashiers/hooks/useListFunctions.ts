import type { Cashier } from "@/types/cashiers/responses";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({
    setEditing,
    setOpenCreate,
}: IUseListFunctionsParams) => {
    const handleOpenCreate = () => setOpenCreate(true);

    const handleEdit = (row: Cashier) => {
        setEditing(row);
    };

    const handleCloseCreate = (open: boolean) => setOpenCreate(open);

    const handleCloseEdit = (open: boolean) => {
        if (!open) setEditing(null);
    };

    return {
        handleOpenCreate,
        handleEdit,
        handleCloseCreate,
        handleCloseEdit,
    };
};
