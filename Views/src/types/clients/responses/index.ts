import { ProductShort } from "@/types/products/responses";

export interface Client {
    id: string;
    nome: string;
    email: string;
    produtos?: ProductShort[];
}

export interface ClientShort {
    id: string;
    nome: string;
}

export interface AllClientsResponse {
    clientes: ClientShort[];
}