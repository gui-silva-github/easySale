import { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/confirm/Dialog';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import type { SalePayment } from '@/types/sales/responses';
import { IPaymentModal } from './interfaces';
import { useListStates } from './hooks/useListStates';
import { useListFunctions } from './hooks/useListFunctions';
import { formatBrl } from '@/utils';

export const PaymentModal: FC<IPaymentModal> = ({
    open,
    onOpenChange,
    sale,
    onPaymentAdded,
    onFinalize,
    addPayment,
    clearPayments,
    finalizeSale,
    paymentMethods,
}) => {
    const { selectedMethod, setSelectedMethod, valor, setValor, valorTroco, setValorTroco, loading, setLoading, finalizing, setFinalizing } = useListStates();

    const totalPorItens =
        (sale?.itens?.reduce((acc, item) => acc + (item.subtotal ?? 0), 0) ?? 0) || 0;
    const totalVenda =
        sale?.itens?.length
            ? totalPorItens
            : (sale?.valorTotal ?? 0);
    const totalPago = (sale?.pagamentos ?? []).reduce((acc, p) => acc + (p.valor ?? 0), 0);
    const restante = totalVenda - totalPago;
    const podeFinalizar =
        sale && sale.itens?.length > 0 && restante >= -0.005 && restante <= 0.005;
    const selectedAllowsChange = paymentMethods.find((m) => m.id === selectedMethod)?.permiteTroco ?? false;

    const { handleValorChange, handleAddPayment, handleClearPayments, handleFinalize, parseDecimal } = useListFunctions({
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
        podeFinalizar: podeFinalizar ?? false,
        sale,
        onPaymentAdded,
        onFinalize,
        onOpenChange,
        addPayment,
        clearPayments,
        finalizeSale,
        paymentMethods,
    });

    if (!sale) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Formas de pagamento</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm">
                        <p className="font-medium">
                            Total da venda:{' '}
                            <span className="font-semibold">
                                R$ {totalVenda.toFixed(2)}
                            </span>
                        </p>
                        <p className="mt-1">
                            Total pago:{' '}
                            <span className="font-semibold">
                                R$ {totalPago.toFixed(2)}
                            </span>{' '}
                            — Restante:{' '}
                            <span
                                className={
                                    restante > 0
                                        ? 'font-semibold text-orange-600'
                                        : restante < 0
                                        ? 'font-semibold text-red-600'
                                        : 'font-semibold text-emerald-600'
                                }
                            >
                                R$ {restante.toFixed(2)}
                            </span>
                        </p>
                        {restante < -0.01 && (
                            <p className="mt-2 text-xs text-amber-700">
                                O total pago passou do valor da venda. Use &quot;Limpar pagamentos&quot; e adicione de novo informando o valor recebido (ex.: 700 para venda de 600); o troco será registrado e a venda poderá ser finalizada.
                            </p>
                        )}
                    </div>

                    {sale.pagamentos && sale.pagamentos.length > 0 && (
                        <div className="max-h-40 space-y-2 overflow-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                            {sale.pagamentos.map((p: SalePayment) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between border-b border-slate-100 pb-1 last:border-0 last:pb-0"
                                >
                                    <span>{p.formaPagamentoDescricao}</span>
                                    <span className="font-medium">
                                        R$ {p.valor?.toFixed(2) ?? 0}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-4 rounded-lg border border-slate-200 bg-white px-4 py-4">
                        <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
                            <div className="col-span-2 md:col-span-1">
                                <label className="mb-1 block text-sm font-medium">
                                    Forma de pagamento
                                </label>
                                <select
                                    value={selectedMethod}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                                >
                                    <option value="">Selecione...</option>
                                    {paymentMethods.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.descricao}{' '}
                                            {m.permiteTroco ? '- Permite Troco' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Valor (R$)
                                </label>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    value={valor}
                                    onChange={(e) => handleValorChange(e.target.value)}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        {selectedAllowsChange && (
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Troco para (opcional)
                                </label>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    value={valorTroco}
                                    onChange={(e) => setValorTroco(e.target.value)}
                                    placeholder="Preenchido automaticamente se o valor for maior que o restante"
                                />
                                {parseDecimal(valor) > restante && restante > 0 && (
                                    <p className="mt-1 text-xs text-slate-500">
                                        Valor recebido maior que o restante. Troco calculado: R${' '}
                                        {formatBrl(parseDecimal(valor) - restante)}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                onClick={handleAddPayment}
                                disabled={loading || !selectedMethod || !valor}
                            >
                                {loading ? 'Adicionando...' : 'Adicionar pagamento'}
                            </Button>
                            {sale.pagamentos && sale.pagamentos.length > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleClearPayments}
                                    disabled={loading}
                                >
                                    Limpar pagamentos
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4 border-t border-slate-100 pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button
                        onClick={handleFinalize}
                        disabled={!podeFinalizar || finalizing}
                    >
                        {finalizing ? 'Finalizando...' : 'Finalizar venda'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
