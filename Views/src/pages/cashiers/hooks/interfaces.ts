export interface IUseListMemorizations {
    isLoadingOpening: boolean;
}

export interface IUseListFunctionsParams {
    setAberturaId: (value: string | null) => void;
    setValorSuprimento: (value: string) => void;
    setValorSangria: (value: string) => void;
    setMovimentoLoading: (value: 'suprimento' | 'sangria' | null) => void;
    setStoredAberturaId: (id: string | null) => void;
    queryClient: { removeQueries: (opts: { queryKey: unknown[] }) => void; invalidateQueries: (opts: { queryKey: unknown[] }) => void };
    aberturaAtual: { id: string } | null;
    toast: { error: (msg: string) => void; success: (msg: string) => void };
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleClosed: () => void;
    parseValor: (s: string) => number | null;
    handleSuprimento: (valorSuprimento: string) => Promise<void>;
    handleSangria: (valorSangria: string) => Promise<void>;
};
