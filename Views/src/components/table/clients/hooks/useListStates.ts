import { useState } from "react";
import type { ClientShort } from "@/types/clients/responses";

export const useListStates = () => {
    const [editing, setEditing] = useState<ClientShort | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ClientShort | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    return {
        editing,
        setEditing,
        deleteTarget,
        setDeleteTarget,
        openCreate,
        setOpenCreate,
        sortKey,
        setSortKey,
        sortDir,
        setSortDir,
    };
};
