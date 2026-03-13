import { useEffect } from 'react';
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
import { useCreateClient, useUpdateClient, useGetClientById } from '@/hooks/clients/useClients';
import type { ClientShort } from '@/types/clients/responses';

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof schema>;

interface ClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  client?: ClientShort;
}

export function ClientModal({
  open,
  onOpenChange,
  mode,
  client,
}: ClientModalProps) {
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();
  const { data: fullClient } = useGetClientById(mode === 'edit' && client ? client.id : null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && fullClient) {
      reset({ nome: fullClient.nome, email: fullClient.email });
    } else if (mode === 'create') {
      reset({ nome: '', email: '' });
    }
  }, [mode, fullClient, reset]);

  const onSubmit = (data: FormData) => {
    if (mode === 'create') {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      });
    } else if (client) {
      updateMutation.mutate(
        { id: client.id, data },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo cliente' : 'Editar cliente'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <Input {...register('nome')} placeholder="Nome" />
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
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
