import { api } from "@/services/api/axios";
import { RequestCashier, RequestOpenCashier } from "@/types/cashiers/requests";
import type {
    Cashier,
    OpenCashier,
    OpenCashierDetailed,
    AllCashiersResponse
} from "@/types/cashiers/responses";
import { backendURL } from "@/utils";

export const cashRegistersAPI = {
    listAll: () => 
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/Listar`).then((r) => {
            if (r.status === 204) return { data: { caixas: [] } };
            return r;
        }),
    listAvailable: () => 
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/ListarDisponiveis`),
    listOpen: () => 
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/ListarAbertos`),
    getById: (id: string) => 
        api.get<Cashier>(`${backendURL}/api/Caixa/${id}`),
    getOpeningId: (caixaId: string) => 
        api.get<OpenCashierDetailed>(`${backendURL}/api/Caixa/ObterAberturaAtual?caixaId=${caixaId}`),
    create: (data: RequestCashier) => 
        api.post<Cashier>(`${backendURL}/api/Caixa`, data),
    open: (caixaId: string, data: RequestOpenCashier) => 
        api.post<OpenCashier>(`${backendURL}/api/Caixa/Abrir?caixaId=${caixaId}`, data),
    close: (id: string) =>
        api.post<void>(`${backendURL}/api/Caixa/${id}/Fechar`),
    select: (id: string) =>
        api.post<void>(`${backendURL}/api/Caixa/${id}/Selecionar`),
    leave: (id: string) => 
        api.post<void>(`${backendURL}/api/Caixa/${id}/Sair`),
    update: (id: string, data: RequestCashier) => 
        api.put<void>(`${backendURL}/api/Caixa/${id}`, data),
    delete: (id: string) =>
        api.delete<void>(`${backendURL}/api/Caixa/${id}`)
};