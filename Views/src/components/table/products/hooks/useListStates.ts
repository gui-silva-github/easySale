import { useState } from "react";
import type { Product } from "@/types/products/responses";

export const useListStates = () => {
    const [editing, setEditing] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
    const [openCreate, setOpenCreate] = useState(false);

    return {
        editing,
        setEditing,
        deleteTarget,
        setDeleteTarget,
        openCreate,
        setOpenCreate,
    };
};
