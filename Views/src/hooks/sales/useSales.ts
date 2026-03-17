import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesAPI } from "@/services/api/endpoints/sales";
import type { RequestAddSaleItem, RequestAddPayment } from "@/types/sales/requests";
import type { PaymentMethod } from "@/types/sales/responses";
import toast from "react-hot-toast";

export const salesKeys = {
    all: ['sales'] as const,
    list: (aberturaId?: string) => (aberturaId ? ['sales', 'list', aberturaId] as const : ['sales', 'list'] as const),
    detail: (id: string) => ['sales', id] as const,
};

export const useGetSales = (aberturaId?: string) => 
    useQuery({
        queryKey: salesKeys.list(aberturaId),
        queryFn: async () => {
            const res = await salesAPI.list(aberturaId);
            return res.data.vendas ?? [];
        }
    });

export const useCreateSale = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (aberturaId: string) => salesAPI.create(aberturaId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: salesKeys.all });
            toast.success('Venda criada');
        }
    })
};

export const useGetSale = (vendaId: string | null) => 
    useQuery({
        queryKey: salesKeys.detail(vendaId ?? ''),
        queryFn: () => salesAPI.getById(vendaId!).then((r) => r.data),
        enabled: !!vendaId,
    });

export const useAddSaleItem = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            vendaId,
            data
        }: {
            vendaId: string;
            data: RequestAddSaleItem;
        }) => salesAPI.addItem(vendaId, data),
        onSuccess: (_, v) => {
            qc.invalidateQueries({ queryKey: salesKeys.detail(v.vendaId) });
            toast.success('Item adicionado');
        }
    })
};

export const useRemoveSaleItem = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ vendaId, itemId }: { vendaId: string; itemId: string }) =>
            salesAPI.removeItem(vendaId, itemId),
        onSuccess: (_, v) => {
            qc.invalidateQueries({ queryKey: salesKeys.detail(v.vendaId) });
            toast.success('Item removido');
        },
    });
};

export const useGetPaymentMethods = () =>
    useQuery({
        queryKey: ['sales', 'paymentMethods'] as const,
        queryFn: async () => {
            const res = await salesAPI.getPaymentMethods();
            return (res.data ?? []) as PaymentMethod[];
        },
    });

export const useAddPayment = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ vendaId, data }: { vendaId: string; data: RequestAddPayment }) =>
            salesAPI.addPayment(vendaId, data),
        onSuccess: (_, v) => {
            qc.invalidateQueries({ queryKey: salesKeys.detail(v.vendaId) });
            toast.success('Pagamento adicionado');
        },
    });
};

export const useClearPayments = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (vendaId: string) => salesAPI.clearPayments(vendaId),
        onSuccess: (_, vendaId) => {
            qc.invalidateQueries({ queryKey: salesKeys.detail(vendaId) });
            toast.success('Pagamentos limpos');
        },
    });
};

export const useFinalizeSale = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (vendaId: string) => salesAPI.finalize(vendaId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: salesKeys.all });
            toast.success('Venda finalizada!');
        },
    });
};