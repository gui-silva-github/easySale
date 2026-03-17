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
import { useCreateProduct, useUpdateProduct } from '@/hooks/products/useProducts';
import { useGetClients } from '@/hooks/clients/useClients';
import { cn } from '@/lib/utils';
import type { ClientShort } from '@/types/clients/responses';
import { IProductModal } from './interfaces';
import { useListFunctions } from './hooks/useListFunctions';

export const ProductModal: FC<IProductModal> = ({
  open,
  onOpenChange,
  mode,
  product,
}) => {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const { data: clients = [] as ClientShort[] } = useGetClients();

  const { register, handleSubmit, errors, onSubmit } = useListFunctions({ 
    mode, 
    product, 
    onOpenChange, 
    createMutation, 
    updateMutation 
  });

  const isCreate = mode === 'create';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? 'Novo produto' : 'Editar produto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-1">
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white px-4 py-4">
            {isCreate && (
              <div>
                <label className="mb-1 block text-sm font-medium">Cliente</label>
                <select
                  {...register('clienteId')}
                  className={cn(
                    'w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2',
                    errors.clienteId
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-200 focus:ring-slate-950'
                  )}
                >
                  <option value="">Selecione...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
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
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Nome</label>
                <Input
                  {...register('nome')}
                  placeholder="Nome do produto"
                  error={!!errors.nome}
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nome.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Marca</label>
                <Input
                  {...register('marca')}
                  placeholder="Marca"
                  error={!!errors.marca}
                />
                {errors.marca && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.marca.message}
                  </p>
                )}
              </div>
            </div>
            <div className="max-w-xs">
              <label className="mb-1 block text-sm font-medium">Preço</label>
              <Input
                {...register('preco', { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="0.00"
                error={!!errors.preco}
              />
              {errors.preco && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.preco.message}
                </p>
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
              disabled={isCreate ? createMutation.isPending : updateMutation.isPending}
            >
              {isCreate ? 'Criar' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}