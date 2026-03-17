import { IUseListFunctions } from "./interfaces";
import { FormData, schema } from "../interfaces";
import { cashRegistersAPI } from "@/services/api/endpoints/cashiers";
import { cashRegistersKeys } from "@/hooks/cashiers/useCashRegisters";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const useListFunctions = ({ mode, caixa, onOpenChange, createMutation, qc }: IUseListFunctions) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            descricao: caixa?.descricao ?? '',
        },
    });

    useEffect(() => {
        if (mode === 'edit' && caixa) {
            reset({ descricao: caixa.descricao });
        } else if (mode === 'create') {
            reset({ descricao: '' });
        }
    }, [mode, caixa, reset]);
    
    const onSubmit = (data: FormData) => {
        if (mode === 'create') {
          createMutation.mutate(
            { descricao: data.descricao },
            {
              onSuccess: () => {
                reset();
                onOpenChange(false);
              },
            }
          );
        } else if (caixa) {
          cashRegistersAPI
            .update(caixa.id, { descricao: data.descricao })
            .then(() => {
              qc.invalidateQueries({ queryKey: cashRegistersKeys.all });
              toast.success('Caixa atualizado');
              onOpenChange(false);
            })
            .catch((e) => toast.error(e.response?.data?.errors?.[0] ?? 'Erro'));
        }
      };

    return {
        onSubmit,
        register,
        handleSubmit,
        reset,
        errors,
    }
}