import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/confirm/Dialog';

interface SaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aberturaId?: string;
}

export function SaleModal({ open, onOpenChange, aberturaId }: SaleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova venda</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500">
          As vendas são criadas ao abrir ou selecionar um caixa.
          Abertura ID: {aberturaId ?? '—'}
        </p>
      </DialogContent>
    </Dialog>
  );
}
