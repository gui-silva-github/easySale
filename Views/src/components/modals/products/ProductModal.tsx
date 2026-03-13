import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { useCreateProduct } from '@/hooks/products/useProducts';
import { useGetClients } from '@/hooks/clients/useClients';
import type { Product } from '@/types/products/responses';

const schema = z.object({
  clienteId: z.string().min(1, 'Selecione um cliente'),
  nome: z.string().min(1, 'Nome obrigatório'),
  marca: z.string().min(1, 'Marca obrigatória'),
  preco: z.number().min(0, 'Preço inválido'),
});

type FormData = z.infer<typeof schema>;

interface Client {
  id: string;
  name: string;
}

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  product?: Product;
}

export function ProductModal({
  open,
  onOpenChange,
  mode,
  product,
}: ProductModalProps) {
  const createMutation = useCreateProduct();
  const { data: clients = [] as Client[] } = useGetClients();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      clienteId: '',
      nome: product?.nome ?? '',
      marca: product?.marca ?? '',
      preco: product?.preco ?? 0,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        clienteId: '',
        nome: product.nome,
        marca: product.marca,
        preco: product.preco,
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (mode === 'create') {
      createMutation.mutate(
        {
          clienteId: data.clienteId,
          data: {
            nome: data.nome,
            marca: data.marca,
            preco: data.preco,
          },
        },
        {
          onSuccess: () => {
            reset();
            onOpenChange(false);
          },
        }
      );
    }
  };

  const isCreate = mode === 'create';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? 'Novo produto' : 'Editar produto (não suportado)'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isCreate && (
            <div>
              <label className="mb-1 block text-sm font-medium">Cliente</label>
              <select
                {...register('clienteId')}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">Selecione...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.clienteId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clienteId.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <Input {...register('nome')} placeholder="Nome" disabled={!isCreate} />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Marca</label>
            <Input {...register('marca')} placeholder="Marca" disabled={!isCreate} />
            {errors.marca && (
              <p className="mt-1 text-sm text-red-600">{errors.marca.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Preço</label>
            <Input
              {...register('preco', { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="0.00"
              disabled={!isCreate}
            />
            {errors.preco && (
              <p className="mt-1 text-sm text-red-600">{errors.preco.message}</p>
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
            {isCreate && (
              <Button type="submit" disabled={createMutation.isPending}>
                Criar
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}