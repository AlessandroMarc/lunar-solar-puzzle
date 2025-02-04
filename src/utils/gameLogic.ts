import type { CellValue } from '../components/GameBoard';

export const validateMove = (
  board: CellValue[][],
  row: number,
  col: number,
  value: CellValue
): boolean => {
  console.log('Validating move:', { row, col, value });
  
  if (!value) return true; // Always allow clearing a cell
  
  // Check for three in a row horizontally
  if (col >= 2 &&
      board[row][col-1] === value &&
      board[row][col-2] === value) {
    console.log('Invalid: three in a row horizontally');
    return false;
  }
  
  // Check for three in a row vertically
  if (row >= 2 &&
      board[row-1][col] === value &&
      board[row-2][col] === value) {
    console.log('Invalid: three in a row vertically');
    return false;
  }
  
  // Count symbols in row
  const rowSymbols = board[row].filter(cell => cell === value).length;
  if (rowSymbols >= 3) {
    console.log('Invalid: too many symbols in row');
    return false;
  }
  
  // Count symbols in column
  const colSymbols = board.map(row => row[col]).filter(cell => cell === value).length;
  if (colSymbols >= 3) {
    console.log('Invalid: too many symbols in column');
    return false;
  }
  
  console.log('Move is valid');
  return true;
};

export const checkGameCompletion = (board: CellValue[][]): boolean => {
  console.log('Checking game completion');
  
  // Check if board is full
  const isFull = board.every(row => row.every(cell => cell !== null));
  if (!isFull) {
    console.log('Board is not full');
    return false;
  }
  
  // Check row constraints
  for (const row of board) {
    const suns = row.filter(cell => cell === 'sun').length;
    const moons = row.filter(cell => cell === 'moon').length;
    if (suns !== 3 || moons !== 3) {
      console.log('Row constraint not met');
      return false;
    }
  }
  
  // Check column constraints
  for (let col = 0; col < board[0].length; col++) {
    const column = board.map(row => row[col]);
    const suns = column.filter(cell => cell === 'sun').length;
    const moons = column.filter(cell => cell === 'moon').length;
    if (suns !== 3 || moons !== 3) {
      console.log('Column constraint not met');
      return false;
    }
  }
  
  console.log('Game is complete!');
  return true;
};