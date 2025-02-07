import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import type { CellValue } from "./GameBoard";
import { Feather } from "@expo/vector-icons";

interface CellProps {
	value: CellValue;
	onClick: () => void;
	isViolating?: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isViolating = false }) => {
	return (
		<TouchableOpacity onPress={onClick} style={[styles.cell, isViolating ? styles.violatingCell : styles.normalCell]}>
			{value === "sun" && <Feather name="sun" size={32} color={isViolating ? "#FCA5A5" : "#FFD700"} />}
			{value === "moon" && <Feather name="moon" size={32} color={isViolating ? "#FCA5A5" : "#C0C0C0"} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cell: {
		flex: 1,
		marginTop: 8,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	normalCell: {
		backgroundColor: "rgba(255, 255, 255, 0.1)"
	},
	violatingCell: {
		backgroundColor: "rgba(255, 0, 0, 0.3)"
	}
});
