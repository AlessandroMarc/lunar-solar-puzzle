import React from 'react';
import type { Constraint } from './GameBoard';

interface GameConstraintProps {
  type: Constraint['type'];
  position: Constraint['position'];
}

export const GameConstraint: React.FC<GameConstraintProps> = ({ type, position }) => {
  console.log('Rendering constraint:', { type, position });
  
  const constraintClass = `absolute ${
    position === 'horizontal' ? 'w-4 h-2 -mx-2' : 'w-2 h-4 -my-2'
  } flex items-center justify-center text-white font-bold`;

  return (
    <div className={constraintClass}>
      {type}
    </div>
  );
};