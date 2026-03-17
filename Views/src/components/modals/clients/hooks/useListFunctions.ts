import { zodResolver } from "@hookform/resolvers/zod";
import { IUseListFunctions } from "./interfaces"
import { schema } from "../interfaces";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "../interfaces";

export const useListFunctions = ({ mode, client, fullClient, onOpenChange, createMutation, updateMutation }: IUseListFunctions) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
          nome: '',
          email: '',
        },
      });
    
      useEffect(() => {
        if (mode === 'edit' && fullClient) {
          reset({ nome: fullClient.nome, email: fullClient.email });
        } else if (mode === 'create') {
          reset({ nome: '', email: '' });
        }
      }, [mode, fullClient, reset]);
    
      const onSubmit = (data: FormData) => {
        if (mode === 'create') {
          createMutation.mutate(data, {
            onSuccess: () => {
              reset();
              onOpenChange(false);
            },
          });
        } else if (client) {
          updateMutation.mutate(
            { id: client.id, data },
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