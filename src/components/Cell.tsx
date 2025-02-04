import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { CellValue } from './GameBoard';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isViolating?: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isViolating = false }) => {
  console.log('Rendering cell with value:', value, 'isViolating:', isViolating);
  
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-lg flex items-center justify-center
                 transition-all duration-200 hover:bg-white/20 animate-piece-place
                 ${isViolating ? 'bg-red-500/30' : 'bg-white/10'}`}
      aria-label={value || 'empty cell'}
    >
      {value === 'sun' && (
        <Sun className={`w-8 h-8 ${isViolating ? 'text-red-300' : 'text-sunColor'}`} />
      )}
      {value === 'moon' && (
        <Moon className={`w-8 h-8 ${isViolating ? 'text-red-300' : 'text-moonColor'}`} />
      )}
    </button>
  );
};