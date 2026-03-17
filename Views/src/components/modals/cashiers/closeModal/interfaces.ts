import { CurrentOpeningResponse } from "@/types/cashiers/responses";

export interface ICloseCashModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    abertura: CurrentOpeningResponse | null;
    caixaId: string;
    onClosed: () => void;
}