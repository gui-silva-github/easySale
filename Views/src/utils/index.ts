import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Banknote,
} from 'lucide-react';
import { QueryClient } from '@tanstack/react-query';

export const backendURL = import.meta.env.BACKEND_SERVICE;

export const nav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/clients', icon: Users, label: 'Clientes' },
    { to: '/products', icon: Package, label: 'Produtos' },
    { to: '/sales', icon: ShoppingCart, label: 'Vendas' },
    { to: '/cash-registers', icon: Banknote, label: 'Caixas' },
];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});