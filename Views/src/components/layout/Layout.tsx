import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';
import { Header } from './header/Header';

export const Layout: FC = () => {
    return (
        <div className='flex h-screen bg-slate-100'>
            <Sidebar />
            <div className='flex flex-1 flex-col overflow-hidden'>
                <Header />
            </div>
            <main className='flex-1 overflow-auto p-6'>
                <Outlet />
            </main>
        </div>
    )
}