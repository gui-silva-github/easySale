import { RequestAddPayment } from "@/types/sales/requests";
import { PaymentMethod, Sale } from "@/types/sales/responses";

export interface IUseListFunctions {
    open: boolean;
    selectedMethod: string;
    valor: string;
    valorTroco: string;
    setSelectedMethod: (method: string) => void;
    setValor: (valor: string) => void;
    setValorTroco: (valorTroco: string) => void;
    setLoading: (loading: boolean) => void;
    setFinalizing: (finalizing: boolean) => void;
    selectedAllowsChange: boolean;
    restante: number;
    podeFinalizar: boolean;
    sale: Sale | null;
    onPaymentAdded: (updatedSale: Sale) => void;
    onFinalize: () => void;
    onOpenChange: (open: boolean) => void;
    addPayment: (vendaId: string, data: RequestAddPayment) => Promise<{ data: Sale }>;
    clearPayments: (vendaId: string) => Promise<{ data: Sale }>;
    finalizeSale: (vendaId: string) => Promise<{ data: Sale }>;
    paymentMethods: PaymentMethod[];
}