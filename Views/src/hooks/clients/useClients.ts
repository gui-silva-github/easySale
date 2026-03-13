import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsAPI } from "@/services/api/endpoints/clients";
import type { RequestClient } from "@/types/clients/requests";
import toast from "react-hot-toast";

export const clientsKey = {
    all: ['clients'] as const,
    detail: (id: string) => ['clients', id] as const,
};

export const useGetClients = () =>
    useQuery({
        queryKey: clientsKey.all,
        queryFn: async () => {
            const res = await clientsAPI.getAll();
            return res?.data.clientes ?? [];
        },
    });

export const useGetClientById = (id: string | null) => 
    useQuery({
        queryKey: clientsKey.detail(id ?? ''),
        queryFn: () => clientsAPI.getById(id!).then((r) => r.data),
        enabled: !!id,
    });

export const useCreateClient = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: RequestClient) => clientsAPI.create(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: clientsKey.all });
            toast.success('Cliente criado');
        },
    })
};

export const useUpdateClient = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: RequestClient }) =>
            clientsAPI.update(id, data),
        onSuccess: (_, v) => {
            qc.invalidateQueries({ queryKey: clientsKey.all });
            qc.invalidateQueries({ queryKey: clientsKey.detail(v.id) });
            toast.success('Cliente atualizado');
        }
    })
};

export const useDeleteClient = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => clientsAPI.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: clientsKey.all });
            toast.success('Cliente excluído')
        }
    })
};