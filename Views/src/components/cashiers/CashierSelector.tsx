import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useOpenCashRegister,
  useSelectCashRegister,
} from '@/hooks/cashiers/useCashRegisters';
import { useListStates } from './hooks/useListStates';
import { useListFunctions } from './hooks/useListFunctions';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListCallAPI } from './hooks/useListCallAPI';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import toast from 'react-hot-toast';
import { setStoredAberturaId } from '@/utils/sessionStorage';
import { PackageIcon, PackageOpenIcon } from 'lucide-react';

export const CashierSelector: FC = () => {
  const navigate = useNavigate();

  const { availableCashRegisters, loadingAvailableCashRegisters, openCashRegisters, loadingOpenCashRegisters } = useListCallAPI();
  const { valorInicial, setValorInicial, aberturaLoading, setAberturaLoading } = useListStates();

  const openMutation = useOpenCashRegister();
  const selectMutation = useSelectCashRegister();

  const { handleOpenCashRegister, handleSelectCashRegister } = useListFunctions({ setAberturaLoading, setValorInicial, setStoredAberturaId, navigate, openMutation, toast, selectMutation });

  const { loading } = useListMemorizations({ loadingAvailableCashRegisters, loadingOpenCashRegisters });

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Carregando caixas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PackageIcon className="h-4 w-4" />
          <h3 className="text-lg font-medium">Caixas Disponíveis</h3>
        </div>
        {availableCashRegisters.length === 0 ? (
          <p className="text-slate-500">Nenhum caixa disponível para abrir</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {availableCashRegisters.map((caixa) => (
              <div
                key={caixa.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
              >
                <div>
                  <p className="font-medium">{caixa.descricao}</p>
                  <p className="text-sm text-slate-500">{caixa.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Valor inicial"
                    value={valorInicial}
                    onChange={(e) => setValorInicial(e.target.value)}
                    min={0}
                    step="0.01"
                    className="w-28"
                  />
                  <Button
                    variant="success"
                    onClick={() => handleOpenCashRegister(caixa.id, parseFloat(valorInicial))}
                    disabled={aberturaLoading === caixa.id || openMutation.isPending}
                  >
                    {aberturaLoading === caixa.id ? 'Abrindo...' : 'Abrir'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <PackageOpenIcon className="h-4 w-4" />
          <h3 className="text-lg font-medium">Caixas Abertos</h3>
        </div>
        {openCashRegisters.length === 0 ? (
          <p className="text-slate-500">Nenhum caixa aberto</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {openCashRegisters.map((caixa) => (
              <div
                key={caixa.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
              >
                <div>
                  <p className="font-medium">{caixa.descricao}</p>
                  <p className="text-sm text-slate-500">{caixa.status}</p>
                </div>
                <Button
                  variant="default"
                  onClick={() => handleSelectCashRegister(caixa.id)}
                  disabled={selectMutation.isPending}
                >
                  Selecionar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
