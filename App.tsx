import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GameBoard } from "./src/components/GameBoard";
import Toast from "react-native-toast-message";
import React from "react";

export default function App() {
	const handleGameComplete = () => {
		Toast.show({
			type: "success",
			text1: "Congratulations!",
			text2: "You've completed the puzzle!!"
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<GameBoard size={6} onGameComplete={handleGameComplete} />
			<Toast />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#4B0082",
		alignItems: "center",
		justifyContent: "center"
	}
});
