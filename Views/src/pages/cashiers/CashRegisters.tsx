import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CashRegistersTable } from '@/components/table/cashiers/CashRegistersTable';
import { CashierSelector } from '@/components/cashiers/CashierSelector';
import { CloseCashModal } from '@/components/modals/cashiers/closeModal/CloseCashModal';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { setStoredAberturaId } from '@/utils/sessionStorage';
import toast from 'react-hot-toast';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const CashRegisters: FC = () => {
    const queryClient = useQueryClient();
    const {
        closeModalOpen,
        setCloseModalOpen,
        aberturaId,
        valorSuprimento,
        setValorSuprimento,
        valorSangria,
        setValorSangria,
        movimentoLoading,
        setAberturaId,
        setMovimentoLoading,
    } = useListStates();

    const { aberturaAtual, isLoadingOpening } = useListCallAPI(aberturaId);
    useListMemorizations({ isLoadingOpening });

    const { handleClosed, handleSuprimento, handleSangria } = useListFunctions({
        setAberturaId,
        setValorSuprimento,
        setValorSangria,
        setMovimentoLoading,
        setStoredAberturaId,
        queryClient,
        aberturaAtual: aberturaAtual ?? null,
        toast,
    });

    return (
        <div className="space-y-6">
            <CashierSelector />
            {aberturaAtual && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 font-medium">Caixa em Uso</h3>
                    <p className="text-sm text-gray-500">
                        {aberturaAtual.caixaDescricao} - Saldo Esperado: R$ {(aberturaAtual.saldoEsperado ?? 0).toFixed(2)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-end gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Suprimento (R$)</label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                value={valorSuprimento}
                                onChange={(e) => setValorSuprimento(e.target.value)}
                                placeholder="0,00"
                                className="w-24"
                            />
                            <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleSuprimento(valorSuprimento)}
                                disabled={movimentoLoading !== null}
                            >
                                {movimentoLoading === 'suprimento' ? 'Registrando...' : 'Registrar'}
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Sangria (R$)</label>
                            <Input
                                type="text"
                                inputMode="decimal"
                                value={valorSangria}
                                onChange={(e) => setValorSangria(e.target.value)}
                                placeholder="0,00"
                                className="w-24"
                            />
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleSangria(valorSangria)}
                                disabled={movimentoLoading !== null}
                            >
                                {movimentoLoading === 'sangria' ? 'Registrando...' : 'Registrar'}
                            </Button>
                        </div>
                    </div>
                    <Button
                        className="mt-4"
                        onClick={() => setCloseModalOpen(true)}
                    >
                        Fechar Caixa (Conferência Cega)
                    </Button>
                </div>
            )}

            <CashRegistersTable />
            <CloseCashModal
                open={closeModalOpen}
                onOpenChange={setCloseModalOpen}
                abertura={aberturaAtual ?? null}
                caixaId={aberturaAtual?.caixaId ?? ''}
                onClosed={handleClosed}
            />
        </div>
    );
};
