export interface SaleItem {
    id: string;
    produtoId: string;
    produtoNome: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}

export interface SalePayment {
    id: string;
    formaPagamentoId: string;
    formaPagamentoDescricao: string;
    permiteTroco: boolean;
    valor: number;
    valorTroco?: number;
}

export interface Sale {
    id: string;
    aberturaCaixaId: string;
    dataVenda: string;
    valorTotal: number;
    status: string;
    itens: SaleItem[];
    pagamentos?: SalePayment[];
}

export interface PaymentMethod {
    id: string;
    descricao: string;
    permiteTroco: boolean;
}