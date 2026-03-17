import { useState, useRef } from "react";
import type { Sale } from "@/types/sales/responses";

export const useListStates = () => {
    const [sale, setSale] = useState<Sale | null>(null);
    const [products, setProducts] = useState<Array<{ id: string; nome: string; preco: number }>>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [customPrice, setCustomPrice] = useState('');
    const [loading, setLoading] = useState(true);
    const [addedItem, setAddedItem] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const initializedRef = useRef(false);
    const createInFlightRef = useRef(false);

    return {
        sale,
        setSale,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        quantity,
        setQuantity,
        customPrice,
        setCustomPrice,
        loading,
        setLoading,
        addedItem,
        setAddedItem,
        paymentModalOpen,
        setPaymentModalOpen,
        initializedRef,
        createInFlightRef,
    };
};
