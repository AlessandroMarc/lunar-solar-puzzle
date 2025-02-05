import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Cell } from "./Cell";
import { GameConstraint } from "./GameConstraint";
import { validateMove, checkGameCompletion } from "../utils/gameLogic";

export type CellValue = "sun" | "moon" | null;
export type Constraint = { type: "=" | "x"; position: "horizontal" | "vertical" };

interface GameBoardProps {
	size: number;
	onGameComplete: () => void;
}

interface Violation {
	type: "three-in-row" | "unbalanced-row" | "unbalanced-column";
	positions: { row: number; col: number }[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ size, onGameComplete }) => {
	const [board, setBoard] = useState<CellValue[][]>(() =>
		Array(size)
			.fill(null)
			.map(() => Array(size).fill(null))
	);
	const [moveCount, setMoveCount] = useState(0);
	const [violations, setViolations] = useState<Violation[]>([]);

	const constraints: Record<string, Constraint> = {
		"0,0-0,1": { type: "x", position: "horizontal" },
		"1,1-1,2": { type: "=", position: "horizontal" },
		"2,2-3,2": { type: "x", position: "vertical" }
	};

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

	useEffect(() => {
		console.log("Current board state:", board);
		checkViolations(board);
		const isComplete = checkGameCompletion(board);
		console.log("Game completion check:", isComplete);
		if (isComplete) {
			console.log("Game completed!");
			onGameComplete();
		}
	}, [board, onGameComplete, checkViolations]);

	const handleCellClick = (row: number, col: number) => {
		console.log(`Cell clicked at ${row},${col}`);

		setBoard(prevBoard => {
			const newBoard = [...prevBoard.map(row => [...row])];
			const currentValue = newBoard[row][col];

			// Cycle through values: null -> sun -> moon -> null
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

	return (
		<View style={styles.container}>
			<Text style={styles.moveCount}>Moves: {moveCount}</Text>
			<View style={[
				styles.grid,
				{ width: Math.min(Dimensions.get('window').width - 32, 400) }
			]}>
				{board.map((row, rowIndex) => (
					<React.Fragment key={rowIndex}>
						{row.map((cell, colIndex) => (
							<React.Fragment key={`${rowIndex}-${colIndex}`}>
								<Cell 
									value={cell} 
									onClick={() => handleCellClick(rowIndex, colIndex)} 
									isViolating={isViolatingCell(rowIndex, colIndex)} 
								/>
								{Object.entries(constraints).map(([key, constraint]) => {
									const [pos1, pos2] = key.split("-");
									const [row1, col1] = pos1.split(",").map(Number);
									const [row2, col2] = pos2.split(",").map(Number);

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
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		padding: 16,
	},
	moveCount: {
		fontSize: 20,
		fontWeight: '600',
		color: 'white',
		marginBottom: 16,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		padding: 16,
		borderRadius: 8,
		gap: 4,
	},
});