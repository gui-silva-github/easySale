import { FC } from "react";
import { NavLink } from "react-router-dom";
import { nav } from "@/utils";
import { cn } from "@/lib/utils";

export const Sidebar: FC = () => {
    return (
        <aside className="w-56 border-r border-slate-200 bg-slate-50/50">
            <nav className="flex flex-col gap-1 p-4">
                {nav.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => 
                            cn(
                                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            )
                        }
                    >
                        <Icon className="h-5 w-5" />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}