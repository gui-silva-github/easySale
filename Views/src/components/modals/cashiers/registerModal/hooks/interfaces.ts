import { Cashier } from "@/types/cashiers/responses";
import { RequestCashier } from "@/types/cashiers/requests";
import { UseMutationResult } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export interface IUseListFunctions {
    mode: 'create' | 'edit';
    caixa?: Cashier;
    onOpenChange: (open: boolean) => void;
    createMutation: UseMutationResult<Cashier, Error, RequestCashier>;
    qc: QueryClient;
}