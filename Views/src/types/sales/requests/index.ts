export interface RequestAddSaleItem {
    produtoId: string;
    quantidade: number;
    precoUnitario?: number;
}

export interface RequestAddPayment {
    formaPagamentoId: string;
    valor: number;
    valorTroco?: number;
}
