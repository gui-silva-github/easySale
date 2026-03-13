import { api } from "@/services/api/axios";
import type { Sale } from "@/types/sales/responses";
import { RequestAddSaleItem } from "@/types/sales/requests";
import { backendURL } from "@/utils";

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
        ),
    addItem: (vendaId: string, data: RequestAddSaleItem) =>
        api.post<Sale>(`${backendURL}/api/Venda/${vendaId}/AdicionarItem`, data),
    removeItem: (vendaId: string, itemId: string) =>
        api.delete<Sale>(`${backendURL}/api/Venda/${vendaId}/Itens/${itemId}`),
    finalize: (vendaId: string) =>
        api.post<Sale>(`${backendURL}/api/Venda/${vendaId}/Finalizar`),
};
