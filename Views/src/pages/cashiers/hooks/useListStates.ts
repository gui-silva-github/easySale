import { useState } from "react";
import { getStoredAberturaId } from "@/utils/sessionStorage";

export const useListStates = () => {
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [aberturaId, setAberturaId] = useState<string | null>(() => getStoredAberturaId());
    const [valorSuprimento, setValorSuprimento] = useState('');
    const [valorSangria, setValorSangria] = useState('');
    const [movimentoLoading, setMovimentoLoading] = useState<'suprimento' | 'sangria' | null>(null);

    return {
        closeModalOpen,
        setCloseModalOpen,
        aberturaId,
        setAberturaId,
        valorSuprimento,
        setValorSuprimento,
        valorSangria,
        setValorSangria,
        movimentoLoading,
        setMovimentoLoading,
    };
};
