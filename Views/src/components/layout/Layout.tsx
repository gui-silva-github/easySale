import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';

export const Layout: FC = () => {
    return (
        <div className='flex h-screen bg-slate-100'>
            <Sidebar />
            <main className='flex-1 overflow-auto p-6'>
                <Outlet />
            </main>
        </div>
    )
}