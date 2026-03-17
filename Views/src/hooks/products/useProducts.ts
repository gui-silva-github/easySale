import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsAPI } from "@/services/api/endpoints/products";
import type { RequestProduct } from "@/types/products/requests";
import toast from "react-hot-toast";

export const productsKeys = {
    all: ['products'] as const,
    detail: (id: string) => ['products', id] as const,
};

export const useGetProducts = () =>
    useQuery({
        queryKey: productsKeys.all,
        queryFn: async () => {
            const res = await productsAPI.getAll();
            return Array.isArray(res.data) ? res.data : [];
        },
    });

export const useGetProductById = (id: string | null) =>
    useQuery({
        queryKey: productsKeys.detail(id ?? ''),
        queryFn: () => productsAPI.getById(id!).then((r) => r.data),
        enabled: !!id,
    });

export const useUpdateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RequestProduct }) =>
            productsAPI.update(id, data).then((r) => r.data),
        onSuccess: (_, v) => {
            qc.invalidateQueries({ queryKey: productsKeys.all });
            qc.invalidateQueries({ queryKey: productsKeys.detail(v.id) });
            toast.success('Produto atualizado');
        },
    });
};

export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ clienteId, data }: { clienteId: string, data: RequestProduct }) =>
            productsAPI.create(clienteId, data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: productsKeys.all });
            qc.invalidateQueries({ queryKey: ['clients']});
            toast.success('Produto criado');
        }
    })
};

export const useDeleteProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productsAPI.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: productsKeys.all });
            qc.invalidateQueries({ queryKey: ['clients'] });
            toast.success('Produto excluído');
        }
    })
}