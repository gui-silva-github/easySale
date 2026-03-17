import { formatBrl } from "@/utils";
import { useEffect } from "react";
import { IUseListFunctions } from "./interfaces";

export const useListFunctions = ({ 
    open, 
    selectedMethod,
    valor, 
    valorTroco, 
    setSelectedMethod, 
    setValor, 
    setValorTroco, 
    setLoading,
    setFinalizing,
    selectedAllowsChange, 
    restante, 
    podeFinalizar,
    sale, 
    onPaymentAdded, 
    onFinalize, 
    onOpenChange,
    addPayment, 
    clearPayments, 
    finalizeSale, 
    paymentMethods 
}: IUseListFunctions) => {
    useEffect(() => {
        if (!open) {
            setSelectedMethod('');
            setValor('');
            setValorTroco('');
        }
    }, [open]);

    const parseDecimal = (s: string) => {
        const normalized = s.trim().replace(',', '.');
        return normalized === '' ? NaN : parseFloat(normalized);
    };

    const handleValorChange = (next: string) => {
        setValor(next);
        if (!selectedAllowsChange) return;
        const v = parseDecimal(next);
        if (!Number.isNaN(v) && v > restante && restante > 0) {
            setValorTroco(formatBrl(v - restante));
        } else {
            setValorTroco('');
        }
    };

    const handleAddPayment = async () => {
        if (!sale || !selectedMethod || !valor.trim()) return;
        const v = parseDecimal(valor);
        if (isNaN(v) || v <= 0) return;
        const method = paymentMethods.find((m) => m.id === selectedMethod);
        if (!method) return;
        if (!method.permiteTroco && valorTroco) return;
        const trocoDigitado = selectedAllowsChange && valorTroco.trim() ? parseDecimal(valorTroco) : undefined;
        if (trocoDigitado !== undefined && (isNaN(trocoDigitado) || trocoDigitado < 0)) return;

        let valorEnviar: number;
        let valorTrocoEnviar: number | undefined;
        if (selectedAllowsChange && v > restante && restante > 0) {
            valorEnviar = restante;
            valorTrocoEnviar = Math.round((v - restante) * 100) / 100;
        } else {
            valorEnviar = v;
            valorTrocoEnviar = trocoDigitado;
        }

        setLoading(true);
        try {
            const res = await addPayment(sale.id, {
                formaPagamentoId: selectedMethod,
                valor: valorEnviar,
                valorTroco: valorTrocoEnviar,
            });
            onPaymentAdded(res.data);
            setValor('');
            setValorTroco('');
        } catch {
        } finally {
            setLoading(false);
        }
    };

    const handleClearPayments = async () => {
        if (!sale || !window.confirm('Limpar todos os pagamentos?')) return;
        setLoading(true);
        try {
            const res = await clearPayments(sale.id);
            onPaymentAdded(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleFinalize = async () => {
        if (!sale || !podeFinalizar) return;
        setFinalizing(true);
        try {
            await finalizeSale(sale.id);
            onFinalize();
            onOpenChange(false);
        } finally {
            setFinalizing(false);
        }
    };

    return {
        handleValorChange,
        handleAddPayment,
        handleClearPayments,
        handleFinalize,
        parseDecimal,
    }
}