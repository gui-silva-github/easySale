import { UseMutationResult } from "@tanstack/react-query";
import { CurrentOpeningResponse } from "@/types/cashiers/responses";
import { RequestOpenCashier } from "@/types/cashiers/requests";

export interface IUseListFunctionsParams {
    setAberturaLoading: (aberturaId: string | null) => void;
    setValorInicial: (valorInicial: string) => void;
    setStoredAberturaId: (aberturaId: string) => void;
    navigate: (path: string) => void;
    openMutation: UseMutationResult<CurrentOpeningResponse, Error, { caixaId: string; data: RequestOpenCashier }, unknown>;
    selectMutation: UseMutationResult<{ aberturaId: string }, Error, string, unknown>;
    toast: {
        error: (message: string) => void;
    };
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleOpenCashRegister: (caixaId: string, valorInicial: number) => Promise<void>;
    handleSelectCashRegister: (caixaId: string) => Promise<void>;
}

export interface IUseListMemorizations {
    loadingAvailableCashRegisters: boolean;
    loadingOpenCashRegisters: boolean;
}