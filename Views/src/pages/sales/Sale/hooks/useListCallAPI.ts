import {
    useGetPaymentMethods,
    useAddPayment,
    useClearPayments,
    useFinalizeSale,
} from "@/hooks/sales/useSales";

export const useListCallAPI = () => {
    const { data: paymentMethods = [] } = useGetPaymentMethods();
    const addPaymentMutation = useAddPayment();
    const clearPaymentsMutation = useClearPayments();
    const finalizeMutation = useFinalizeSale();

    return {
        paymentMethods,
        addPaymentMutation,
        clearPaymentsMutation,
        finalizeMutation,
    };
};
