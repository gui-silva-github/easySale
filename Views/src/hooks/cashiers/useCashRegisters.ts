import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cashRegistersAPI } from "@/services/api/endpoints/cashiers";
import type { RequestCashier, RequestOpenCashier } from "@/types/cashiers/requests";
import toast from "react-hot-toast";

export const cashRegistersKeys = {
    all: ['cashRegisters'] as const,
    available: ['cashRegisters', 'available'] as const,
    open: ['cashRegisters', 'open'] as const,
    detail: (id: string) => ['cashRegisters', id] as const,
    opening: (caixaId: string) => ['cashRegisters', 'opening', caixaId] as const,
};

export const useGetCashRegisters = () =>
    useQuery({
        queryKey: cashRegistersKeys.all,
        queryFn: async () => {
            const res = await cashRegistersAPI.listAll();
            return res.data.caixas ?? [];
        }
    });

export const useGetAvailableCashRegisters = () => 
    useQuery({
        queryKey: cashRegistersKeys.available,
        queryFn: async () => {
            const res = await cashRegistersAPI.listAvailable();
            return res.data.caixas ?? [];
        }
    });

export const useGetOpenCashRegisters = () => 
    useQuery({
        queryKey: cashRegistersKeys.open,
        queryFn: async () => {
            const res = await cashRegistersAPI.listOpen();
            return res.data.caixas ?? [];
        }
    });

export const useGetCashRegisterById = (id: string | null) =>
    useQuery({
        queryKey: cashRegistersKeys.detail(id ?? ''),
        queryFn: () => cashRegistersAPI.getById(id!).then((r) => r.data),
        enabled: !!id,
    })

export const useGetOpening = (aberturaId: string | null, enabled = true) =>
    useQuery({
        queryKey: [...cashRegistersKeys.open, 'current', aberturaId ?? ''] as const,
        queryFn: async () => {
            if (!aberturaId) return null;
            try {
                const r = await cashRegistersAPI.getCurrentOpening(aberturaId, undefined);
                return r.data;
            } catch {
                return null;
            }
        },
        enabled: !!(enabled && aberturaId),
        retry: false,
    });

export const useCreateCashRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: RequestCashier) => cashRegistersAPI.create(data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: cashRegistersKeys.all });
            qc.invalidateQueries({ queryKey: cashRegistersKeys.available });
            toast.success('Caixa criado');
        },
    })
};

export const useOpenCashRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ caixaId, data }: { caixaId: string, data: RequestOpenCashier }) =>
            cashRegistersAPI.open(caixaId, data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: cashRegistersKeys.all });
            qc.invalidateQueries({ queryKey: cashRegistersKeys.available });
            qc.invalidateQueries({ queryKey: cashRegistersKeys.open });
            toast.success('Caixa aberto');
        }
    });
};

export const useCloseCashRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => cashRegistersAPI.close(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: cashRegistersKeys.all });
            qc.invalidateQueries({ queryKey: cashRegistersKeys.open });
            qc.invalidateQueries({ queryKey: cashRegistersKeys.available });
            toast.success('Caixa fechado');
        }
    })
};

export const useSelectCashRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => cashRegistersAPI.select(id).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: cashRegistersKeys.open });
        }
    })
};