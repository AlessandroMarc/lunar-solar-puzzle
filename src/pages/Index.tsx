import React from 'react';
import { GameBoard } from '../components/GameBoard';
import { toast } from '../components/ui/use-toast';

const Index = () => {
  const handleGameComplete = () => {
    console.log('Game complete callback triggered');
    toast({
      title: "Congratulations!",
      description: "You've completed the puzzle!",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gameBackground flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Tango</h1>
      <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
        <GameBoard size={6} onGameComplete={handleGameComplete} />
      </div>
      <div className="mt-8 text-white/80 max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Rules:</h2>
        <ul className="text-sm space-y-2">
          <li>Fill each square with either a moon or a sun</li>
          <li>Avoid three same symbols in a row (horizontally or vertically)</li>
          <li>Follow the constraints: X = different symbols, = = same symbols</li>
          <li>Each row and column must have equal numbers of moons and suns</li>
        </ul>
      </div>
    </div>
  );
};

export default Index;