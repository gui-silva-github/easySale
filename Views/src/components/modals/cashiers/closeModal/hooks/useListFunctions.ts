import { cashRegistersAPI } from "@/services/api/endpoints/cashiers";
import { toast } from "react-hot-toast";
import { gerarPdfFechamento } from "@/components/pdf/FechamentoCaixaPDF";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({ valorInformado, setValorInformado, resultado, setResultado, setLoading, setClosing, signature, setSignature, setPrinting, abertura, caixaId, setStoredAberturaId, onClosed, onOpenChange }: IUseListFunctionsParams) => {
    const handleConferir = async () => {
        if (!abertura) return;
        const v = parseFloat(valorInformado.replace(',', '.'));
        if (isNaN(v) || v < 0) {
            toast.error('Informe um valor válido.');
            return;
        }
        setLoading(true);
        setResultado(null);
        try {
            const res = await cashRegistersAPI.postBlindReceiving(abertura.id, v);
            setResultado(res.data);
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro na conferência.');
        } finally {
            setLoading(false);
        }
    };

    const handleImprimir = async () => {
        if (!abertura || !resultado) return;
        setPrinting(true);
        try {
            const blob = await gerarPdfFechamento(abertura, resultado, signature || undefined);
            const url = URL.createObjectURL(blob);
            const janela = window.open(url, '_blank');
            if (!janela) {
                toast.error('Permita pop-ups para imprimir.');
            }
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } catch {
            toast.error('Erro ao gerar PDF. Tente novamente.');
        } finally {
            setPrinting(false);
        }
    };

    const handleFecharCaixa = async () => {
        if (!caixaId || !abertura) return;
        setClosing(true);
        try {
            await cashRegistersAPI.close(caixaId);
            setStoredAberturaId(null);
            toast.success('Caixa fechado com sucesso.');
            onClosed();
            onOpenChange(false);
            setResultado(null);
            setValorInformado('');
            setSignature('');
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            const data = err.response?.data as { errors?: string[] } | undefined;
            toast.error(data?.errors?.join(', ') ?? 'Erro ao fechar caixa.');
        } finally {
            setClosing(false);
        }
    };

    const handleClose = () => {
        setResultado(null);
        setValorInformado('');
        setSignature('');
        onOpenChange(false);
    };

    return {
        handleConferir,
        handleImprimir,
        handleFecharCaixa,
        handleClose,
    }
}