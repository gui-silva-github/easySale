import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/confirm/Dialog';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useCreateClient, useUpdateClient, useGetClientById } from '@/hooks/clients/useClients';
import { FC } from 'react';
import { useListFunctions } from './hooks/useListFunctions';
import { IClientModal } from './interfaces';
import { useQueryClient } from '@tanstack/react-query';

export const ClientModal: FC<IClientModal> = ({
  open,
  onOpenChange,
  mode,
  client,
}) => {
  const queryClient = useQueryClient();

  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  const { data: fullClient } = useGetClientById(mode === 'edit' && client ? client.id : null);

  const { register, handleSubmit, errors, onSubmit } = useListFunctions({ mode, client, fullClient, onOpenChange, createMutation, updateMutation, qc: queryClient });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo cliente' : 'Editar cliente'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white px-4 py-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nome</label>
              <Input
                {...register('nome')}
                placeholder="Nome completo"
                error={!!errors.nome}
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="email@exemplo.com"
                error={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
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
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
