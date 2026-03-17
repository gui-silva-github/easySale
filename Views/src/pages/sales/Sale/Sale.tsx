import { useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { PaymentModal } from '@/components/modals/sales/PaymentModal';
import { setStoredAberturaId } from '@/utils/sessionStorage';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { useListStates } from './hooks/useListStates';
import { useListCallAPI } from './hooks/useListCallAPI';
import { useListMemorizations } from './hooks/useListMemorizations';
import { useListFunctions } from './hooks/useListFunctions';

export const SaleComponent: FC = () => {
    const { openingId } = useParams<{ openingId: string }>();
    const navigate = useNavigate();

    const {
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
    } = useListStates();

    const { paymentMethods, addPaymentMutation, clearPaymentsMutation, finalizeMutation } = useListCallAPI();
    const { totalItens } = useListMemorizations({ sale });

    const {
        initializeSale,
        loadProducts,
        handleAddItem,
        handleRemoveItem,
        handleOpenPaymentModal,
        handlePaymentAdded,
        handleFinalizeFromModal,
    } = useListFunctions({
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
    });

    useEffect(() => {
        if (!openingId) return;
        setStoredAberturaId(openingId);
        if (initializedRef.current) return;
        initializedRef.current = true;
        initializeSale();
        loadProducts();
    }, [openingId, initializeSale, loadProducts, initializedRef]);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-slate-500">Carregando venda...</p>
            </div>
        );
    }

    if (!sale) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <p className="text-red-500">Erro ao carregar venda</p>
                <Button variant="outline" onClick={() => navigate('/cash-registers')}>
                    Voltar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Nova Venda</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/cash-registers')}>
                        Voltar
                    </Button>
                    <Button onClick={handleOpenPaymentModal} disabled={!sale.itens?.length}>
                        Pagamento e finalizar
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-medium">Adicionar Produto</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Produto</label>
                            <select
                                title="products"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                            >
                                <option value="">Selecione um produto</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nome} - R$ {(p.preco ?? 0).toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Quantidade</label>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Preço Unitário (opcional)
                            </label>
                            <Input
                                type="text"
                                value={customPrice}
                                onChange={(e) => setCustomPrice(e.target.value)}
                                placeholder="Deixe vazio para preço padrão"
                            />
                        </div>
                        <Button
                            onClick={handleAddItem}
                            disabled={addedItem || !selectedProduct}
                        >
                            {addedItem ? 'Adicionando...' : 'Adicionar Produto'}
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-medium">Itens da Venda</h3>
                    {sale.itens && sale.itens.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-left">
                                            <th className="pb-2">Produto</th>
                                            <th className="pb-2">Qtd</th>
                                            <th className="pb-2">Preço Unit.</th>
                                            <th className="pb-2">Subtotal</th>
                                            <th className="pb-2 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sale.itens.map((item) => (
                                            <tr key={item.id} className="border-b border-slate-100">
                                                <td className="py-2">{item.produtoNome}</td>
                                                <td className="py-2">{item.quantidade}</td>
                                                <td className="py-2">
                                                    R$ {(item.precoUnitario ?? 0).toFixed(2)}
                                                </td>
                                                <td className="py-2">R$ {(item.subtotal ?? 0).toFixed(2)}</td>
                                                <td className="py-2 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-lg font-semibold">
                                Total: R$ {(totalItens ?? 0).toFixed(2)}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-slate-500">Nenhum item adicionado ainda</p>
                            <p className="mt-2 text-sm font-medium">
                                Total: R$ {(totalItens ?? 0).toFixed(2)}
                            </p>
                        </>
                    )}
                </div>
            </div>

            <PaymentModal
                open={paymentModalOpen}
                onOpenChange={setPaymentModalOpen}
                sale={sale}
                onPaymentAdded={handlePaymentAdded}
                onFinalize={handleFinalizeFromModal}
                addPayment={(id, data) => addPaymentMutation.mutateAsync({ vendaId: id, data })}
                clearPayments={(id) => clearPaymentsMutation.mutateAsync(id)}
                finalizeSale={(id) => finalizeMutation.mutateAsync(id)}
                paymentMethods={paymentMethods}
            />
        </div>
    );
};
