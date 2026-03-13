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

export interface OpenCashierDetailed extends OpenCashier {
    caixaDescricao: string;
    dataFechamento?: string;
    valorFinal?: number;
    totalVendas: number;
    saldoEsperado: number;
    vendas: Sale[];
}