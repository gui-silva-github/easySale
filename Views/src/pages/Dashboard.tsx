import { FC } from "react";
import { useGetClients } from "@/hooks/clients/useClients";
import { useGetProducts } from "@/hooks/products/useProducts";
import { useGetCashRegisters } from "@/hooks/cashiers/useCashRegisters";
import { Users, Package, Banknote } from "lucide-react";

export const Dashboard: FC = () => {
    const { data: clients = [] } = useGetClients();
    const { data: products = [] } = useGetProducts();
    const { data: cashiers = [] } = useGetCashRegisters();

    const cards = [
        { label: 'Clientes', value: clients.length, icon: Users, color: 'bg-blue-500' },
        { label: 'Produtos', value: products.length, icon: Package, color: 'bg-esmerald-500' },
        { label: 'Caixas', value: cashiers.length, icon: Banknote, color: 'bg-amber-500' }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-3">
                {cards.map(({ label, value, icon: Icon, color }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`rounded-lg ${color} p-3 text-white`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>     
                                <p className="text-sm text-slate-500">{label}</p>
                                <p className="text-2xl font-bold">{value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};