import { Banknote, LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export const nav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/clients', icon: Users, label: 'Clientes' },
    { to: '/products', icon: Package, label: 'Produtos' },
    { to: '/sales', icon: ShoppingCart, label: 'Vendas' },
    { to: '/cash-registers', icon: Banknote, label: 'Caixas' },
];