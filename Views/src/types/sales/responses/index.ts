export interface SaleItem {
    id: string;
    produtoId: string;
    produtoNome: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}

export interface Sale {
    id: string;
    aberturaCaixaId: string;
    dataVenda: string;
    valorTotal: number;
    itens: SaleItem[];
}