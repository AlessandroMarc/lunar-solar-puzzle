import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Constraint } from "./GameBoard";

interface GameConstraintProps {
	type: Constraint["type"];
	position: Constraint["position"];
}

export const GameConstraint: React.FC<GameConstraintProps> = ({ type, position }) => {
	console.log("Rendering constraint:", { type, position });

	return (
		<View style={[position === "horizontal" ? styles.horizontalConstraint : styles.verticalConstraint, styles.constraint]}>
			<Text style={styles.constraintText}>{type}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	constraint: {
		position: "absolute",
		alignItems: "baseline",
		justifyContent: "center"
	},
	horizontalConstraint: {
		width: 16,
		height: 8
	},
	verticalConstraint: {
		width: 8,
		height: 16
	},
	constraintText: {
		color: "white",
		fontWeight: "bold"
	}
});
