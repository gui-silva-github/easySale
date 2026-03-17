import { Sale } from "@/types/sales/responses";

export interface Cashier {
    id: string;
    descricao: string;
    status: string;
}

export interface AllCashiersResponse {
    caixas: Cashier[];
}

export interface OpenCashier {
    id: string;
    caixaId: string;
    dataAbertura: string;
    valorInicial: number;
    estaAberto: boolean;
}

export interface CurrentOpeningResponse {
    id: string;
    caixaId: string;
    caixaDescricao: string;
    dataAbertura: string;
    dataFechamento?: string;
    valorInicial: number;
    valorFinal?: number;
    estaAberto: boolean;
    totalVendas: number;
    totalSuprimentos: number;
    totalSangrias: number;
    saldoEsperado: number;
}

export interface OpenCashierDetailed extends CurrentOpeningResponse {
    vendas?: Sale[];
}

export interface BlindReceivingResponse {
    valorEsperado: number;
    valorInicial: number;
    totalVendas: number;
    totalSuprimentos: number;
    totalSangrias: number;
}

export interface BlindReceivingFinalResponse {
    valorEsperado: number;
    valorInformado: number;
    diferenca: number;
    batido: boolean;
}

export interface CashierMovementResponse {
    id: string;
    tipo: string;
    valor: number;
    dataMovimento: string;
    observacao?: string;
}