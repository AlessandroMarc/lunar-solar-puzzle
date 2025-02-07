
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGameLogic } from "../hooks/useGameLogic";
import { GameGrid } from "./GameGrid";
import { checkGameCompletion } from "../utils/gameLogic";

export type CellValue = "sun" | "moon" | null;
export type Constraint = { type: "=" | "x"; position: "horizontal" | "vertical" };

interface GameBoardProps {
	size: number;
	onGameComplete: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ size, onGameComplete }) => {
	const { board, moveCount, checkViolations, handleCellClick, isViolatingCell } = useGameLogic(size, onGameComplete);

	const constraints: Record<string, Constraint> = {
		"0,0-0,1": { type: "x", position: "horizontal" },
		"1,1-1,2": { type: "=", position: "horizontal" },
		"2,2-3,2": { type: "x", position: "vertical" }
	};

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

	return (
		<View style={styles.container}>
			<Text style={styles.moveCount}>Moves: {moveCount}</Text>
			<GameGrid
				board={board}
				constraints={constraints}
				onCellClick={handleCellClick}
				isViolatingCell={isViolatingCell}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 16,
		width: "100%"
	},
	moveCount: {
		fontSize: 20,
		fontWeight: "600",
		color: "white",
		marginBottom: 16
	}
});
