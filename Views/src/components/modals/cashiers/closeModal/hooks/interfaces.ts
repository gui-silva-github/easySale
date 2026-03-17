import { CurrentOpeningResponse, BlindReceivingFinalResponse } from "@/types/cashiers/responses";

export interface IUseListFunctionsParams {
    valorInformado: string;
    setValorInformado: (valorInformado: string) => void;
    resultado: BlindReceivingFinalResponse | null;
    setResultado: (resultado: BlindReceivingFinalResponse | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    closing: boolean;
    setClosing: (closing: boolean) => void;
    signature: string;
    setSignature: (signature: string) => void;
    printing: boolean;
    setPrinting: (printing: boolean) => void;
    abertura: CurrentOpeningResponse | null;
    caixaId: string;
    setStoredAberturaId: (id: string | null) => void;
    onClosed: () => void;
    onOpenChange: (open: boolean) => void;
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    handleConferir: () => Promise<void>;
    handleImprimir: () => Promise<void>;
    handleFecharCaixa: () => Promise<void>;
    handleClose: () => void;
};