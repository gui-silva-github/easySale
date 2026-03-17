import { useState } from "react";
import { type Cashier } from "@/types/cashiers/responses";

export const useListStates = () => {
    const [editing, setEditing] = useState<Cashier | null>(null);
    const [openCreate, setOpenCreate] = useState(false);

    return {
        editing,
        setEditing,
        openCreate,
        setOpenCreate,
    };
};
