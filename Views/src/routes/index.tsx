import { createBrowserRouter } from "react-router-dom";
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Clients } from '@/pages/clients/Clients';
import { Products } from '@/pages/products/Products';
import { Sales } from '@/pages/sales/Sales';
import { CashRegisters } from '@/pages/cashiers/CashRegisters';
import { SaleComponent } from '@/pages/sales/Sale/Sale';

export const routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
        { index: true, element: <Dashboard /> },
        { path: '/clients', element: <Clients /> },
        { path: '/products', element: <Products /> },
        { path: '/sales', element: <Sales /> },
        { path: '/cash-registers', element: <CashRegisters /> },
        { path: '/sale/:openingId', element: <SaleComponent /> },
    ] },
])