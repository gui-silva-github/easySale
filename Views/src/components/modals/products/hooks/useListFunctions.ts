import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUseListFunctions } from "./interfaces";
import { FormData, schema } from "../interfaces";
import { useEffect } from "react";

export const useListFunctions = ({ mode, product, onOpenChange, createMutation, updateMutation }: IUseListFunctions) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          clienteId: '',
          nome: product?.nome ?? '',
          marca: product?.marca ?? '',
          preco: product?.preco ?? 0,
        },
      });
    
      useEffect(() => {
        if (product) {
          reset({
            clienteId: '',
            nome: product.nome,
            marca: product.marca,
            preco: product.preco,
          });
        }
      }, [product, reset]);
    
      const onSubmit: SubmitHandler<FormData> = (data) => {
        if (mode === 'create') {
          if (!data.clienteId) {
            return;
          }
          createMutation.mutate(
            {
              clienteId: data.clienteId,
              data: { nome: data.nome, marca: data.marca, preco: data.preco },
            },
            {
              onSuccess: () => {
                reset();
                onOpenChange(false);
              },
            }
          );
        } else if (product?.id) {
          updateMutation.mutate(
            {
              id: product.id,
              data: { nome: data.nome, marca: data.marca, preco: data.preco },
            },
            {
              onSuccess: () => {
                onOpenChange(false);
              },
            }
          );
        }
      };

    return {
        register,
        handleSubmit,
        reset,
        errors,
        onSubmit,
    }
}