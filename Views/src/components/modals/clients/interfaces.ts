import { z } from "zod";
import { ClientShort } from "@/types/clients/responses";

export const schema = z.object({
    nome: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email('Email inválido'),
  });
  
export type FormData = z.infer<typeof schema>;
  
export interface IClientModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'edit';
    client?: ClientShort;
}