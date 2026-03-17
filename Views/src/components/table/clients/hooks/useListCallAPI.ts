import { useGetClients, useDeleteClient } from "@/hooks/clients/useClients";

export const useListCallAPI = () => {
    const { data = [], isLoading } = useGetClients();
    const deleteMutation = useDeleteClient();

    return {
        data,
        isLoading,
        deleteMutation,
    };
};
