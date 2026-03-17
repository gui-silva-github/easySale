import { BlindReceivingFinalResponse } from "@/types/cashiers/responses";
import { useState } from "react";

export const useListStates = () => {
    const [valorInformado, setValorInformado] = useState('');
    const [resultado, setResultado] = useState<BlindReceivingFinalResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [closing, setClosing] = useState(false);
    const [signature, setSignature] = useState('');
    const [printing, setPrinting] = useState(false);

    return {
        valorInformado,
        setValorInformado,
        resultado,
        setResultado,
        loading,
        setLoading,
        closing,
        setClosing,
        signature,
        setSignature,
        printing,
        setPrinting,
    }
}