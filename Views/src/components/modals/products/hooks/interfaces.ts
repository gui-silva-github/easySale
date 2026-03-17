import { Product, ProductShort } from "@/types/products/responses";
import { RequestProduct } from "@/types/products/requests";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseListFunctions {
    mode: 'create' | 'edit';
    product?: Product;
    onOpenChange: (open: boolean) => void;
    createMutation: UseMutationResult<ProductShort, Error, { clienteId: string; data: RequestProduct }>;
    updateMutation: UseMutationResult<Product, Error, { id: string; data: RequestProduct }>;
}