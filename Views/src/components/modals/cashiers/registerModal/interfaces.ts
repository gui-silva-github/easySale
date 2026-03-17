import { Cashier } from "@/types/cashiers/responses";
import { z } from "zod";

export const schema = z.object({
    descricao: z.string().min(1, 'Descrição obrigatória'),
});

export type FormData = z.infer<typeof schema>;

export interface ICashRegisterModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'edit';
    caixa?: Cashier;
}