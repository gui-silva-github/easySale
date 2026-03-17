import { PaymentMethod, Sale } from "@/types/sales/responses";
import { RequestAddPayment } from "@/types/sales/requests";

export interface IPaymentModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sale: Sale | null;
    onPaymentAdded: (updatedSale: Sale) => void;
    onFinalize: () => void;
    addPayment: (vendaId: string, data: RequestAddPayment) => Promise<{ data: Sale }>;
    clearPayments: (vendaId: string) => Promise<{ data: Sale }>;
    finalizeSale: (vendaId: string) => Promise<{ data: Sale }>;
    paymentMethods: PaymentMethod[];
}