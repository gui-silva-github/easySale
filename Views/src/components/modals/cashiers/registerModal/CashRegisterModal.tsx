import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/confirm/Dialog';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useCreateCashRegister } from '@/hooks/cashiers/useCashRegisters';
import { useQueryClient } from '@tanstack/react-query';
import { ICashRegisterModal } from './interfaces';
import { FC } from 'react';
import { useListFunctions } from './hooks/useListFunctions';

export const CashRegisterModal: FC<ICashRegisterModal> = ({
  open,
  onOpenChange,
  mode,
  caixa,
}) => {
  const createMutation = useCreateCashRegister();
  const qc = useQueryClient();

  const { register, handleSubmit, errors, onSubmit } = useListFunctions({ mode, caixa, onOpenChange, createMutation, qc });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo caixa' : 'Editar caixa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Descrição</label>
              <Input
                {...register('descricao')}
                placeholder="Ex: Caixa Frente Loja"
                error={!!errors.descricao}
              />
              {errors.descricao && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.descricao.message}
                </p>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Use um nome que identifique facilmente a localização ou função do
              caixa.
            </p>
          </div>
          <DialogFooter className="mt-2 border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
            >
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
