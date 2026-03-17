import { Product } from "@/types/products/responses";
import { z } from "zod";

export interface IProductModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'edit';
    product?: Product;
}

export const schema = z.object({
    clienteId: z.string().optional(),
    nome: z.string().min(1, 'Nome obrigatório'),
    marca: z.string().min(1, 'Marca obrigatória'),
    preco: z
        .number()
        .refine((n) => !Number.isNaN(n), 'Informe um preço válido')
        .refine((n) => n >= 0, 'O preço deve ser maior ou igual a zero'),
});
  
export type FormData = z.infer<typeof schema>;