import { api } from "@/services/api/axios";
import { RequestCashier, RequestOpenCashier } from "@/types/cashiers/requests";
import type {
    Cashier,
    AllCashiersResponse,
    CurrentOpeningResponse,
    BlindReceivingResponse,
    BlindReceivingFinalResponse,
    CashierMovementResponse,
} from "@/types/cashiers/responses";
import { backendURL } from "@/utils/url";

export const cashRegistersAPI = {
    listAll: () =>
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/Listar`).then((r) => {
            if (r.status === 204) return { data: { caixas: [] } };
            return r;
        }),
    listAvailable: () =>
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/ListarDisponiveis`).then((r) => {
            if (r.status === 204) return { data: { caixas: [] } };
            return r;
        }),
    listOpen: () =>
        api.get<AllCashiersResponse>(`${backendURL}/api/Caixa/ListarAbertos`).then((r) => {
            if (r.status === 204) return { data: { caixas: [] } };
            return r;
        }),
    getById: (id: string) =>
        api.get<Cashier>(`${backendURL}/api/Caixa/${id}`),
    getCurrentOpening: (aberturaId?: string, caixaId?: string) => {
        const params = new URLSearchParams();
        if (aberturaId) params.set("aberturaId", aberturaId);
        if (caixaId) params.set("caixaId", caixaId);
        const qs = params.toString();
        return api.get<CurrentOpeningResponse>(`${backendURL}/api/Caixa/ObterAberturaAtual${qs ? `?${qs}` : ''}`);
    },
    getBlindReceiving: (aberturaId: string) =>
        api.get<BlindReceivingResponse>(`${backendURL}/api/Caixa/Abertura/${aberturaId}/ConferenciaCega`),
    postBlindReceiving: (aberturaId: string, valorInformado: number) =>
        api.post<BlindReceivingFinalResponse>(
            `${backendURL}/api/Caixa/Abertura/${aberturaId}/ConferenciaCega`,
            { valorInformado }
        ),
    registerMovement: (aberturaId: string, tipo: "Suprimento" | "Sangria", valor: number, observacao?: string) =>
        api.post<CashierMovementResponse>(`${backendURL}/api/Caixa/Abertura/${aberturaId}/Movimento`, {
            tipo,
            valor,
            observacao,
        }),
    create: (data: RequestCashier) =>
        api.post<Cashier>(`${backendURL}/api/Caixa`, data),
    open: (caixaId: string, data: RequestOpenCashier) =>
        api.post<CurrentOpeningResponse>(`${backendURL}/api/Caixa/Abrir?caixaId=${caixaId}`, data),
    close: (caixaId: string) =>
        api.post<void>(`${backendURL}/api/Caixa/${caixaId}/Fechar`),
    select: (id: string) =>
        api.post<{ aberturaId: string }>(`${backendURL}/api/Caixa/${id}/Selecionar`),
    leave: (id: string) =>
        api.post<void>(`${backendURL}/api/Caixa/${id}/Sair`),
    update: (id: string, data: RequestCashier) =>
        api.put<void>(`${backendURL}/api/Caixa/${id}`, data),
    delete: (id: string) =>
        api.delete<void>(`${backendURL}/api/Caixa/${id}`),
};