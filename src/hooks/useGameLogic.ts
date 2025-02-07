
import { useState, useCallback } from "react";
import type { CellValue } from "../components/GameBoard";
import { validateMove, checkGameCompletion } from "../utils/gameLogic";

interface Violation {
	type: "three-in-row" | "unbalanced-row" | "unbalanced-column";
	positions: { row: number; col: number }[];
}

export const useGameLogic = (size: number, onGameComplete: () => void) => {
	const [board, setBoard] = useState<CellValue[][]>(() =>
		Array(size)
			.fill(null)
			.map(() => Array(size).fill(null))
	);
	const [moveCount, setMoveCount] = useState(0);
	const [violations, setViolations] = useState<Violation[]>([]);

	const checkViolations = useCallback(
		(board: CellValue[][]) => {
			const newViolations: Violation[] = [];

			// Check for three in a row horizontally
			for (let row = 0; row < size; row++) {
				for (let col = 0; col < size - 2; col++) {
					if (board[row][col] && board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2]) {
						newViolations.push({
							type: "three-in-row",
							positions: [
								{ row, col },
								{ row, col: col + 1 },
								{ row, col: col + 2 }
							]
						});
					}
				}
			}

			// Check for three in a row vertically
			for (let row = 0; row < size - 2; row++) {
				for (let col = 0; col < size; col++) {
					if (board[row][col] && board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col]) {
						newViolations.push({
							type: "three-in-row",
							positions: [
								{ row, col },
								{ row: row + 1, col },
								{ row: row + 2, col }
							]
						});
					}
				}
			}

			// Check for unbalanced rows
			for (let row = 0; row < size; row++) {
				const suns = board[row].filter(cell => cell === "sun").length;
				const moons = board[row].filter(cell => cell === "moon").length;
				if (suns > 3 || moons > 3) {
					newViolations.push({
						type: "unbalanced-row",
						positions: board[row].map((_, col) => ({ row, col }))
					});
				}
			}

			// Check for unbalanced columns
			for (let col = 0; col < size; col++) {
				const column = board.map(row => row[col]);
				const suns = column.filter(cell => cell === "sun").length;
				const moons = column.filter(cell => cell === "moon").length;
				if (suns > 3 || moons > 3) {
					newViolations.push({
						type: "unbalanced-column",
						positions: column.map((_, row) => ({ row, col }))
					});
				}
			}

			setViolations(newViolations);
			return newViolations.length === 0;
		},
		[size]
	);

	const handleCellClick = (row: number, col: number) => {
		console.log(`Cell clicked at ${row},${col}`);

		setBoard(prevBoard => {
			const newBoard = [...prevBoard.map(row => [...row])];
			const currentValue = newBoard[row][col];

			let newValue: CellValue = null;
			if (currentValue === null) newValue = "sun";
			else if (currentValue === "sun") newValue = "moon";

			console.log(`Placing ${newValue} at ${row},${col}`);
			newBoard[row][col] = newValue;
			setMoveCount(prev => prev + 1);
			return newBoard;
		});
	};

	const isViolatingCell = (row: number, col: number) => {
		return violations.some(violation => violation.positions.some(pos => pos.row === row && pos.col === col));
	};

	return {
		board,
		moveCount,
		violations,
		checkViolations,
		handleCellClick,
		isViolatingCell
	};
};
