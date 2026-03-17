import type { Sale } from "@/types/sales/responses";

export interface IUseListMemorizations {
    sale: Sale | null;
}

export interface IUseListFunctionsParams {
    openingId: string | undefined;
    createInFlightRef: { current: boolean };
    sale: Sale | null;
    setSale: (s: Sale | null) => void;
    setProducts: (p: Array<{ id: string; nome: string; preco: number }>) => void;
    setLoading: (l: boolean) => void;
    selectedProduct: string;
    setSelectedProduct: (s: string) => void;
    quantity: number;
    setQuantity: (q: number) => void;
    customPrice: string;
    setCustomPrice: (s: string) => void;
    setAddedItem: (a: boolean) => void;
    setPaymentModalOpen: (open: boolean) => void;
    navigate: (path: string) => void;
    toast: { error: (msg: string) => void; success: (msg: string) => void };
}

export type IUseListFunctions = (params: IUseListFunctionsParams) => {
    initializeSale: () => Promise<void>;
    loadProducts: () => Promise<void>;
    handleAddItem: () => Promise<void>;
    handleRemoveItem: (itemId: string) => Promise<void>;
    handleOpenPaymentModal: () => void;
    handlePaymentAdded: (updatedSale: Sale) => void;
    handleFinalizeFromModal: () => void;
};
