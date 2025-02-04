import React, { useState, useEffect } from 'react';
import { Cell } from './Cell';
import { GameConstraint } from './GameConstraint';
import { validateMove, checkGameCompletion } from '../utils/gameLogic';

export type CellValue = 'sun' | 'moon' | null;
export type Constraint = { type: '=' | 'x', position: 'horizontal' | 'vertical' };

interface GameBoardProps {
  size: number;
  onGameComplete: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ size, onGameComplete }) => {
  const [board, setBoard] = useState<CellValue[][]>(() => 
    Array(size).fill(null).map(() => Array(size).fill(null))
  );
  const [moveCount, setMoveCount] = useState(0);
  
  // Example constraints - in a real game these would be generated or loaded
  const constraints: Record<string, Constraint> = {
    '0,0-0,1': { type: 'x', position: 'horizontal' },
    '1,1-1,2': { type: '=', position: 'horizontal' },
    '2,2-3,2': { type: 'x', position: 'vertical' },
  };

  useEffect(() => {
    console.log('Current board state:', board);
    const isComplete = checkGameCompletion(board);
    console.log('Game completion check:', isComplete);
    if (isComplete) {
      console.log('Game completed!');
      onGameComplete();
    }
  }, [board, onGameComplete]); // Added onGameComplete to the dependency array

  const handleCellClick = (row: number, col: number) => {
    console.log(`Cell clicked at ${row},${col}`);
    
    setBoard(prevBoard => {
      const newBoard = [...prevBoard.map(row => [...row])];
      const currentValue = newBoard[row][col];
      
      // Cycle through values: null -> sun -> moon -> null
      let newValue: CellValue = null;
      if (currentValue === null) newValue = 'sun';
      else if (currentValue === 'sun') newValue = 'moon';
      
      console.log(`Attempting to place ${newValue} at ${row},${col}`);
      
      if (validateMove(newBoard, row, col, newValue)) {
        console.log('Move is valid');
        newBoard[row][col] = newValue;
        setMoveCount(prev => prev + 1);
        return newBoard;
      } else {
        console.log('Move is invalid');
        return prevBoard;
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-semibold text-white mb-4">
        Moves: {moveCount}
      </div>
      <div className="relative grid gap-1" 
           style={{ 
             gridTemplateColumns: `repeat(${size}, 1fr)`,
             backgroundColor: 'rgba(255, 255, 255, 0.1)',
             padding: '1rem',
             borderRadius: '0.5rem'
           }}>
        {board.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <React.Fragment key={`${rowIndex}-${colIndex}`}>
                <Cell
                  value={cell}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
                {Object.entries(constraints).map(([key, constraint]) => {
                  const [pos1, pos2] = key.split('-');
                  const [row1, col1] = pos1.split(',').map(Number);
                  const [row2, col2] = pos2.split(',').map(Number);
                  
                  if (row1 === rowIndex && col1 === colIndex) {
                    return (
                      <GameConstraint
                        key={`constraint-${key}`}
                        type={constraint.type}
                        position={constraint.position}
                      />
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};