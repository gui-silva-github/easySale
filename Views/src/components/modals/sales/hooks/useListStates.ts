import { useState } from "react";

export const useListStates = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [valor, setValor] = useState('');
    const [valorTroco, setValorTroco] = useState('');
    const [loading, setLoading] = useState(false);
    const [finalizing, setFinalizing] = useState(false);

    return {
        selectedMethod,
        setSelectedMethod,
        valor,
        setValor,
        valorTroco,
        setValorTroco,
        loading,
        setLoading,
        finalizing,
        setFinalizing,
    }
}