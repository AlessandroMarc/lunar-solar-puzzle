import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { CellValue } from './GameBoard';

interface CellProps {
  value: CellValue;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  console.log('Rendering cell with value:', value);
  
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center
                 transition-all duration-200 hover:bg-white/20 animate-piece-place"
      aria-label={value || 'empty cell'}
    >
      {value === 'sun' && (
        <Sun className="w-8 h-8 text-sunColor" />
      )}
      {value === 'moon' && (
        <Moon className="w-8 h-8 text-moonColor" />
      )}
    </button>
  );
};