
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { GameBoard } from "../GameBoard";

describe("GameBoard", () => {
	const mockOnGameComplete = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders correctly", () => {
		const { getByText } = render(<GameBoard size={6} onGameComplete={mockOnGameComplete} />);
		expect(getByText("Moves: 0")).toBeTruthy();
	});

	test("increments move count when cell is clicked", () => {
		const { getByText, getAllByRole } = render(
			<GameBoard size={6} onGameComplete={mockOnGameComplete} />
		);
		
		const cells = getAllByRole("button");
		fireEvent.press(cells[0]);
		
		expect(getByText("Moves: 1")).toBeTruthy();
	});

	test("cycles through cell values when clicked", () => {
		const { getAllByRole } = render(
			<GameBoard size={6} onGameComplete={mockOnGameComplete} />
		);
		
		const cells = getAllByRole("button");
		const firstCell = cells[0];
		
		// Initial state (null)
		expect(firstCell).toBeTruthy();
		
		// First click (sun)
		fireEvent.press(firstCell);
		expect(firstCell.props.accessibilityLabel).toBe("sun");
		
		// Second click (moon)
		fireEvent.press(firstCell);
		expect(firstCell.props.accessibilityLabel).toBe("moon");
		
		// Third click (back to null)
		fireEvent.press(firstCell);
		expect(firstCell.props.accessibilityLabel).toBe("empty");
	});
});
