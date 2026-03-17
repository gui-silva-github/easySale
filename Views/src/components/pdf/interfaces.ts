import { CurrentOpeningResponse } from "@/types/cashiers/responses";
import { BlindReceivingFinalResponse } from "@/types/cashiers/responses";

export interface IFechamentoCaixaPDF {
    abertura: CurrentOpeningResponse;
    resultado: BlindReceivingFinalResponse;
    assinatura?: string;
}