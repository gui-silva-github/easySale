import { Client, ClientShort } from "@/types/clients/responses";
import { RequestClient } from "@/types/clients/requests";
import { UseMutationResult } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export interface IUseListFunctions {
    fullClient?: Client;
    mode: 'create' | 'edit';
    client?: ClientShort;
    onOpenChange: (open: boolean) => void;
    createMutation: UseMutationResult<ClientShort, Error, RequestClient>;
    updateMutation: UseMutationResult<void, Error, { id: string; data: RequestClient }>;
    qc: QueryClient;
}