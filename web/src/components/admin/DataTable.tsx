import React from 'react';

interface DataTableProps {
    data: any[];
    columns: { header: string; accessor: string; cell?: (val: any) => React.ReactNode }[];
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
    return (
        <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#bab59c] opacity-60">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="px-8 py-4 font-black">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-[#bab59c]">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                {columns.map((col, j) => (
                                    <td key={j} className="px-8 py-5">
                                        {col.cell ? col.cell(row[col.accessor]) : (row[col.accessor] || '-')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
