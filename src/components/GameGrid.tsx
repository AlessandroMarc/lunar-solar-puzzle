import React from "react";
import { View, StyleSheet } from "react-native";
import { Cell } from "./Cell";
import { GameConstraint } from "./GameConstraint";
import type { CellValue } from "./GameBoard";
import { Constraint } from "@/lib/constraints";

interface GameGridProps {
	board: CellValue[][];
	constraints: Record<string, Constraint>;
	onCellClick: (row: number, col: number) => void;
	isViolatingCell: (row: number, col: number) => boolean;
}

export const GameGrid: React.FC<GameGridProps> = ({ board, constraints, onCellClick, isViolatingCell }) => {
	return (
		<View style={styles.gridContainer}>
			<View style={styles.grid}>
				{board.map((row, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{row.map((cell, colIndex) => (
							<View key={`${rowIndex}-${colIndex}`} style={styles.cellContainer}>
								<Cell value={cell} onClick={() => onCellClick(rowIndex, colIndex)} isViolating={isViolatingCell(rowIndex, colIndex)} />
								{Object.entries(constraints).map(([key, constraint]) => {
									const [pos1, pos2] = key.split("-");
									const [row1, col1] = pos1.split(",").map(Number);

									if (row1 === rowIndex && col1 === colIndex) {
										return <GameConstraint key={`constraint-${key}`} type={constraint.type} position={constraint.position} />;
									}
									return null;
								})}
							</View>
						))}
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	gridContainer: {
		width: "100%",
		maxWidth: 400,
		aspectRatio: 1,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		padding: 16,
		borderRadius: 8
	},
	grid: {
		flex: 1,
		width: "100%"
	},
	row: {
		flex: 1,
		flexDirection: "row",
		gap: 4
	},
	cellContainer: {
		flex: 1,
		aspectRatio: 1,
		marginHorizontal: 2,
		position: "relative"
	}
});
