import { useState } from "react";

export const useListStates = () => {
    const [valorInicial, setValorInicial] = useState('');
    const [aberturaLoading, setAberturaLoading] = useState<string | null>(null);
    
    return {
        valorInicial,
        setValorInicial,
        aberturaLoading,
        setAberturaLoading,
    }
}