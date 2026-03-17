import { salesAPI } from "@/services/api/endpoints/sales";
import { productsAPI } from "@/services/api/endpoints/products";
import type { Sale } from "@/types/sales/responses";
import type { IUseListFunctions, IUseListFunctionsParams } from "./interfaces";

export const useListFunctions: IUseListFunctions = ({
    openingId,
    createInFlightRef,
    sale,
    setSale,
    setProducts,
    setLoading,
    selectedProduct,
    setSelectedProduct,
    quantity,
    setQuantity,
    customPrice,
    setCustomPrice,
    setAddedItem,
    setPaymentModalOpen,
    navigate,
    toast,
}: IUseListFunctionsParams) => {
    const initializeSale = async () => {
        if (!openingId) return;
        if (createInFlightRef.current) return;
        createInFlightRef.current = true;
        try {
            setLoading(true);
            const res = await salesAPI.create(openingId);
            setSale((prev) => (prev ? prev : res.data));
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao criar venda');
        } finally {
            setLoading(false);
            createInFlightRef.current = false;
        }
    };

    const loadProducts = async () => {
        try {
            const res = await productsAPI.getAll();
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch {
            setProducts([]);
        }
    };

    const handleAddItem = async () => {
        if (!sale || !selectedProduct || quantity <= 0) {
            toast.error('Selecione um produto e informe a quantidade');
            return;
        }
        try {
            setAddedItem(true);
            const data = {
                produtoId: selectedProduct,
                quantidade: quantity,
                precoUnitario: customPrice ? parseFloat(customPrice.replace(',', '.')) : undefined,
            };
            const res = await salesAPI.addItem(sale.id, data);
            setSale(res.data);
            setSelectedProduct('');
            setQuantity(1);
            setCustomPrice('');
            toast.success('Item adicionado');
        } catch (e: unknown) {
            const err = e as { response?: { data?: { errors?: string[] } } };
            toast.error(err.response?.data?.errors?.join(', ') ?? 'Erro ao adicionar item');
        } finally {
            setAddedItem(false);
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        if (!sale) return;
        if (!window.confirm('Deseja remover este item?')) return;
        try {
            const res = await salesAPI.removeItem(sale.id, itemId);
            setSale(res.data);
            toast.success('Item removido');
        } catch {
            toast.error('Erro ao remover o item');
        }
    };

    const handleOpenPaymentModal = () => setPaymentModalOpen(true);

    const handlePaymentAdded = (updatedSale: Sale) => {
        setSale(updatedSale);
    };

    const handleFinalizeFromModal = () => {
        setSale(null);
        navigate('/cash-registers');
    };

    return {
        initializeSale,
        loadProducts,
        handleAddItem,
        handleRemoveItem,
        handleOpenPaymentModal,
        handlePaymentAdded,
        handleFinalizeFromModal,
    };
};
