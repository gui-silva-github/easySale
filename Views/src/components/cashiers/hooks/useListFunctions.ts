import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({ setAberturaLoading, setValorInicial, setStoredAberturaId, navigate, openMutation, toast, selectMutation }: IUseListFunctionsParams) => {
    const handleOpenCashRegister = async (caixaId: string, valorInicial: number) => {
        try {
            setAberturaLoading(caixaId);
            const res = await openMutation.mutateAsync({
                caixaId,
                data: { valorInicial: valorInicial },
            });
            setValorInicial('');
            const aberturaId = res.id;
            if (aberturaId) {
                setStoredAberturaId(aberturaId);
                navigate(`/sale/${aberturaId}`);
            } else {
                toast.error('Erro ao obter ID da abertura');
            }
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao abrir caixa');
        } finally {
            setAberturaLoading(null);
        }
    }

    const handleSelectCashRegister = async (caixaId: string) => {
        try {
            const res = await selectMutation.mutateAsync(caixaId);
            const aberturaId = res.aberturaId;
            if (aberturaId) {
                setStoredAberturaId(aberturaId);
                navigate(`/sale/${aberturaId}`);
            } else {
                toast.error('Erro ao obter ID da abertura');
            }
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao selecionar caixa');
        }
    }

    return {
        handleOpenCashRegister,
        handleSelectCashRegister,
    }
}