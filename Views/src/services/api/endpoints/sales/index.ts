import { api } from "@/services/api/axios";
import type { Sale, PaymentMethod } from "@/types/sales/responses";
import { RequestAddSaleItem, RequestAddPayment } from "@/types/sales/requests";
import { backendURL } from "@/utils/url";

export const salesAPI = {
    create: (aberturaId: string) =>
        api.post<Sale>(`${backendURL}/api/Venda/Abertura/${aberturaId}/Criar`),
    getById: (vendaId: string) =>
        api.get<Sale>(`${backendURL}/api/Venda/${vendaId}`),
    list: (aberturaId?: string) =>
        api.get<{ vendas: Sale[] }>(
            aberturaId
                ? `${backendURL}/api/Venda/Listar?aberturaId=${aberturaId}`
                : `${backendURL}/api/Venda/Listar`
        ).then((r) => {
            if (r.status === 204) return { data: { vendas: [] } };
            return r;
        }),
    addItem: (vendaId: string, data: RequestAddSaleItem) =>
        api.post<Sale>(`${backendURL}/api/Venda/${vendaId}/AdicionarItem`, data),
    removeItem: (vendaId: string, itemId: string) =>
        api.delete<Sale>(`${backendURL}/api/Venda/${vendaId}/Itens/${itemId}`),
    update: (vendaId: string, data: { itens?: Array<{ produtoId: string; quantidade: number; precoUnitario?: number }> }) =>
        api.put<Sale>(`${backendURL}/api/Venda/${vendaId}`, data),
    remove: (vendaId: string) =>
        api.delete<void>(`${backendURL}/api/Venda/${vendaId}`),
    getPaymentMethods: () =>
        api.get<PaymentMethod[]>(`${backendURL}/api/Venda/FormasPagamento`),
    addPayment: (vendaId: string, data: RequestAddPayment) =>
        api.post<Sale>(`${backendURL}/api/Venda/${vendaId}/Pagamentos`, data),
    clearPayments: (vendaId: string) =>
        api.delete<Sale>(`${backendURL}/api/Venda/${vendaId}/Pagamentos`),
    finalize: (vendaId: string) =>
        api.post<Sale>(`${backendURL}/api/Venda/${vendaId}/Finalizar`),
};
