import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { cashRegistersAPI } from '@/services/api/endpoints/cashiers';
import { useQueryClient } from '@tanstack/react-query';
import { cashRegistersKeys } from '@/hooks/cashiers/useCashRegisters';
import toast from 'react-hot-toast';
import type { Cashier } from '@/types/cashiers/responses';

const schema = z.object({
  descricao: z.string().min(1, 'Descrição obrigatória'),
});

type FormData = z.infer<typeof schema>;

interface CashRegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  caixa?: Cashier;
}

export function CashRegisterModal({
  open,
  onOpenChange,
  mode,
  caixa,
}: CashRegisterModalProps) {
  const createMutation = useCreateCashRegister();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      descricao: caixa?.descricao ?? '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (mode === 'create') {
      createMutation.mutate(
        { descricao: data.descricao },
        {
          onSuccess: () => {
            reset();
            onOpenChange(false);
          },
        }
      );
    } else if (caixa) {
      cashRegistersAPI
        .update(caixa.id, { descricao: data.descricao })
        .then(() => {
          qc.invalidateQueries({ queryKey: cashRegistersKeys.all });
          toast.success('Caixa atualizado');
          onOpenChange(false);
        })
        .catch((e) => toast.error(e.response?.data?.errors?.[0] ?? 'Erro'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo caixa' : 'Editar caixa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <Input {...register('descricao')} placeholder="Ex: Caixa 1" />
            {errors.descricao && (
              <p className="mt-1 text-sm text-red-600">
                {errors.descricao.message}
              </p>
            )}
          </div>
          <DialogFooter>
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
