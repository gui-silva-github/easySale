import { cashRegistersKeys } from "@/hooks/cashiers/useCashRegisters";
import { cashRegistersAPI } from "@/services/api/endpoints/cashiers";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({
    setAberturaId,
    setValorSuprimento,
    setValorSangria,
    setMovimentoLoading,
    setStoredAberturaId,
    queryClient,
    aberturaAtual,
    toast,
}: IUseListFunctionsParams) => {
    const handleClosed = () => {
        setStoredAberturaId(null);
        setAberturaId(null);
        queryClient.removeQueries({ queryKey: [...cashRegistersKeys.open, 'current'] });
        queryClient.invalidateQueries({ queryKey: cashRegistersKeys.all });
        queryClient.invalidateQueries({ queryKey: cashRegistersKeys.open });
        queryClient.invalidateQueries({ queryKey: cashRegistersKeys.available });
    };

    const parseValor = (s: string) => {
        const v = parseFloat(s.trim().replace(',', '.'));
        return Number.isNaN(v) ? null : v;
    };

    const handleSuprimento = async (valorSuprimento: string) => {
        const valor = parseValor(valorSuprimento);
        if (!aberturaAtual || valor == null || valor <= 0) {
            toast.error('Informe um valor válido.');
            return;
        }
        setMovimentoLoading('suprimento');
        try {
            await cashRegistersAPI.registerMovement(aberturaAtual.id, 'Suprimento', valor);
            setValorSuprimento('');
            queryClient.invalidateQueries({ queryKey: [...cashRegistersKeys.open, 'current'] });
            toast.success('Suprimento registrado.');
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao registrar suprimento.');
        } finally {
            setMovimentoLoading(null);
        }
    };

    const handleSangria = async (valorSangria: string) => {
        const valor = parseValor(valorSangria);
        if (!aberturaAtual || valor == null || valor <= 0) {
            toast.error('Informe um valor válido.');
            return;
        }
        setMovimentoLoading('sangria');
        try {
            await cashRegistersAPI.registerMovement(aberturaAtual.id, 'Sangria', valor);
            setValorSangria('');
            queryClient.invalidateQueries({ queryKey: [...cashRegistersKeys.open, 'current'] });
            toast.success('Sangria registrada.');
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao registrar sangria.');
        } finally {
            setMovimentoLoading(null);
        }
    };

    return {
        handleClosed,
        parseValor,
        handleSuprimento,
        handleSangria,
    };
};
