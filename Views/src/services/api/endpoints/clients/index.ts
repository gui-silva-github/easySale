import { api } from "@/services/api/axios";
import type { Client, ClientShort } from "@/types/clients/responses";
import type { RequestClient } from "@/types/clients/requests";
import { backendURL } from "@/utils";

export const clientsAPI = {
    getAll: () =>
        api.get<{ clientes: ClientShort[] }>(`${backendURL}/api/Cliente`).then((r) => {
            if (r.status === 204) return { data: { clientes: [] } };
        }),
    getById: (id: string) =>
        api.get<Client>(`${backendURL}/api/Cliente/${id}`),
    create: (data: RequestClient) =>
        api.post<ClientShort>(`${backendURL}/api/Cliente`, data),
    update: (id: string, data: RequestClient) => 
        api.put<void>(`${backendURL}/api/Cliente/${id}`, data),
    delete: (id: string) => 
        api.delete<void>(`${backendURL}/api/Cliente/${id}`)
};
