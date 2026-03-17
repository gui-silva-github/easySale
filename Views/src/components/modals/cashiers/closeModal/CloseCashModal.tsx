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
import { setStoredAberturaId } from '@/utils/sessionStorage';
import { ICloseCashModal } from './interfaces';
import { useListStates } from './hooks/useListStates';
import { useListFunctions } from './hooks/useListFunctions';

export const CloseCashModal: FC<ICloseCashModal> = ({
    open,
    onOpenChange,
    abertura,
    caixaId,
    onClosed,
}) => {
    const { valorInformado, setValorInformado, resultado, setResultado, loading, setLoading, closing, setClosing, signature, setSignature, printing, setPrinting } = useListStates();

    const { handleConferir, handleImprimir, handleFecharCaixa, handleClose } = useListFunctions({ valorInformado, setValorInformado, resultado, setResultado, loading, setLoading, closing, setClosing, signature, setSignature, printing, setPrinting, abertura, caixaId, setStoredAberturaId, onClosed, onOpenChange });

    if (!abertura) return null;

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); else onOpenChange(o); }}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Fechamento de caixa - {abertura.caixaDescricao}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {!resultado ? (
                        <>
                            <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm">
                                <p className="text-slate-600">
                                    Informe o valor contado no caixa (conferência cega). O sistema
                                    comparará com o valor esperado.
                                </p>
                                <p className="mt-2 font-medium">
                                    Valor esperado:{' '}
                                    <span className="font-semibold">
                                        R$ {abertura.saldoEsperado?.toFixed(2) ?? 0}
                                    </span>
                                </p>
                            </div>
                            <div className="space-y-2 rounded-lg border border-slate-200 bg-white px-4 py-4">
                                <label className="mb-1 block text-sm font-medium">
                                    Valor informado (R$)
                                </label>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    value={valorInformado}
                                    onChange={(e) => setValorInformado(e.target.value)}
                                    placeholder="0,00"
                                />
                                <p className="text-xs text-slate-500">
                                    Dica: conte o dinheiro fisicamente e informe o valor total aqui.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleConferir} disabled={loading}>
                                    {loading ? 'Conferindo...' : 'Conferir'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-sm">
                                <p>
                                    <span className="font-medium">Valor inicial: </span>
                                    R$ {abertura.valorInicial?.toFixed(2) ?? 0}
                                </p>
                                <p>
                                    <span className="font-medium">Total vendas: </span>
                                    R$ {abertura.totalVendas?.toFixed(2) ?? 0}
                                </p>
                                <p>
                                    <span className="font-medium">Suprimentos: </span>
                                    R$ {abertura.totalSuprimentos?.toFixed(2) ?? 0}
                                </p>
                                <p>
                                    <span className="font-medium">Sangrias: </span>
                                    R$ {abertura.totalSangrias?.toFixed(2) ?? 0}
                                </p>
                                <div className="mt-2 rounded-md bg-white px-3 py-2">
                                    <p>
                                        <span className="font-medium">Valor esperado: </span>
                                        R$ {resultado.valorEsperado?.toFixed(2) ?? 0}
                                    </p>
                                    <p>
                                        <span className="font-medium">Valor informado: </span>
                                        R$ {resultado.valorInformado?.toFixed(2) ?? 0}
                                    </p>
                                    <p
                                        className={
                                            resultado.batido
                                                ? 'font-semibold text-emerald-600'
                                                : 'font-semibold text-red-600'
                                        }
                                    >
                                        Diferença: R$ {resultado.diferenca?.toFixed(2) ?? 0}{' '}
                                        {resultado.batido ? '- Conferência OK' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
                                <label className="mb-1 block text-sm font-medium">
                                    Assinatura (para impressão)
                                </label>
                                <Input
                                    type="text"
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    placeholder="Nome do responsável"
                                />
                                <div className="flex flex-wrap gap-2 pt-1">
                                    <Button
                                        variant="outline"
                                        onClick={handleImprimir}
                                        disabled={printing}
                                    >
                                        {printing ? 'Gerando PDF...' : 'Imprimir relatório (PDF)'}
                                    </Button>
                                    <Button onClick={handleFecharCaixa} disabled={closing}>
                                        {closing ? 'Fechando...' : 'Fechar caixa'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter className="mt-4 border-t border-slate-100 pt-4">
                    <Button variant="outline" onClick={handleClose}>
                        {resultado ? 'Cancelar' : 'Fechar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
