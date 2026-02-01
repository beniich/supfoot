import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
    endpoint: string;
    filename: string;
    label: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ label }) => {
    return (
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-xl hover:bg-primary/90 transition-all text-[10px] font-black uppercase tracking-widest italic shadow-glow-sm">
            <Download size={14} />
            <span>{label}</span>
        </button>
    );
};
