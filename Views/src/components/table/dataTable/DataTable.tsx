import { useState, useMemo, ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortDir = 'asc' | 'desc' | undefined | null;

export interface Column<T> {
    key: string;
    header: string;
    sortKey?: string;
    render?: (row: T) => ReactNode;
};

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (row: T) => string;
    sortKey?: string;
    sortDir?: SortDir;
    onSort?: (key: string) => void;
    loading?: boolean;
    emptyMessage?: string;
    searchPlaceholder?: string;
    searchKeys?: (keyof T)[];
    rowsPerPage?: number;
    actions?: (row: T) => ReactNode;
}

const SkeletonRow = () => (
    <tr className="border-b border-slate-100">
        {[1, 2, 3, 4, 5].map((i) => (
            <td key={i} className='p-4'>
                <div className="h-4 animate-pulse rounded bg-slate-200"/>
            </td>
        ))}
    </tr>
);

export function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    keyExtractor,
    sortKey,
    sortDir,
    onSort,
    loading = false,
    emptyMessage = 'Nenhum registro encontrado',
    searchPlaceholder = 'Buscar...',
    searchKeys = [],
    rowsPerPage = 10,
    actions,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const normalized = (text: string) =>
        String(text ?? '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

    const filtered = useMemo(() => {
        const term = search?.trim();
        if (!term || searchKeys.length === 0) return data;
        const s = normalized(term);
        return data.filter((row) =>
            searchKeys.some((k) =>
                normalized(String(row[k] ?? '')).includes(s)
            )
        );
    }, [data, search, searchKeys]);

    const paginated = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filtered.slice(start, start + rowsPerPage);
    }, [filtered, page, rowsPerPage]);

    const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {searchKeys.length > 0 && (
                <div className='border-b border-slate-100 p-4'>
                    <input 
                        type='text'
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                </div>
            )}
            <div className="overflow-x-auto">
                <table className='w-full'>
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-4 text-left text-sm font-medium text-slate-700"
                                >
                                    {col.sortKey && onSort ? (
                                        <button
                                            type='button'
                                            className='flex items-center gap-1 hover:text-slate-900'
                                            onClick={() => onSort(col.sortKey!)}
                                        >
                                            {col.header}
                                            {sortKey === col.sortKey ? (
                                                sortDir === 'asc' ? (
                                                    <ChevronUp className='h-4 w-4' />
                                                ) : (
                                                    <ChevronDown className='h-4 w-4' />
                                                )
                                            ): (
                                                <span className='inline-block w-4' />
                                            )}
                                        </button>
                                    ) : (
                                        col.header
                                    )}
                                </th>
                            ))}
                            {actions && <th className='w-24 p-4 text-right'>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && data.length === 0 ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ): paginated.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className='p-12 text-center text-slate-500'
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <svg
                                        className="h-12 w-12 text-slate-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                        </svg>
                                        {emptyMessage}
                                    </div>
                                </td>
                            </tr>
                        ): (
                            paginated.map((row, i) => (
                                <tr
                                    key={keyExtractor(row)}
                                    className={cn(
                                        'border-b border-slate-100 transition-colors hover:bg-slate-50',
                                        i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                                    )}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="p-4 text-sm text-slate-700">
                                        {col.render
                                            ? col.render(row)
                                            : String(row[col.key] ?? '')}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className='p-4 text-right'>{actions(row)}</td>
                                    )}
                                </tr>  
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && !loading && (
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                    <p className="text-sm text-slate-500">
                        Mostrando {(page - 1) * rowsPerPage + 1} a{' '}
                        {Math.min(page * rowsPerPage, filtered.length)} de {filtered.length}
                    </p>
                    <div className="flex gap-2">
                        <button
                            type='button'
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                             className="rounded border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <button
                            type='button'
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                             className="rounded border border-slate-200 px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

