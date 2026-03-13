import { api } from "@/services/api/axios";
import type { Product, ProductShort } from "@/types/products/responses";
import { RequestProduct } from "@/types/products/requests";
import { backendURL } from "@/utils";

export const productsAPI = {
    getAll: () => 
        api.get<Product[]>(`${backendURL}/api/Produto`).then((r) => {
            if (r.status === 204) return { data: [] };
            return r;
        }),
    create: (clienteId: string, data: RequestProduct) => 
        api.post<ProductShort>(`${backendURL}/api/Produto/${clienteId}`, data),
    delete: (id: string) => 
        api.delete<void>(`${backendURL}/api/Produto/${id}`),
};