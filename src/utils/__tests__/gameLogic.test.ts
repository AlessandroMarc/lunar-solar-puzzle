
import { validateMove, checkGameCompletion } from "../gameLogic";
import type { CellValue } from "../../components/GameBoard";

describe("validateMove", () => {
	let board: CellValue[][];

	beforeEach(() => {
		board = Array(6).fill(null).map(() => Array(6).fill(null));
	});

	test("allows placing a symbol in an empty cell", () => {
		expect(validateMove(board, 0, 0, "sun")).toBe(true);
	});

	test("prevents three same symbols in a row horizontally", () => {
		board[0][0] = "sun";
		board[0][1] = "sun";
		expect(validateMove(board, 0, 2, "sun")).toBe(false);
	});

	test("prevents three same symbols in a row vertically", () => {
		board[0][0] = "moon";
		board[1][0] = "moon";
		expect(validateMove(board, 2, 0, "moon")).toBe(false);
	});

	test("prevents more than three symbols in a row", () => {
		board[0] = ["sun", "sun", "sun", null, null, null];
		expect(validateMove(board, 0, 3, "sun")).toBe(false);
	});
});

describe("checkGameCompletion", () => {
	test("returns false for incomplete board", () => {
		const board: CellValue[][] = Array(6).fill(null).map(() => Array(6).fill(null));
		expect(checkGameCompletion(board)).toBe(false);
	});

	test("returns true for valid complete board", () => {
		const board: CellValue[][] = [
			["sun", "moon", "sun", "moon", "sun", "moon"],
			["moon", "sun", "moon", "sun", "moon", "sun"],
			["sun", "moon", "sun", "moon", "sun", "moon"],
			["moon", "sun", "moon", "sun", "moon", "sun"],
			["sun", "moon", "sun", "moon", "sun", "moon"],
			["moon", "sun", "moon", "sun", "moon", "sun"]
		];
		expect(checkGameCompletion(board)).toBe(true);
	});

	test("returns false for invalid complete board", () => {
		const board: CellValue[][] = [
			["sun", "sun", "sun", "moon", "moon", "moon"],
			["moon", "moon", "moon", "sun", "sun", "sun"],
			["sun", "sun", "sun", "moon", "moon", "moon"],
			["moon", "moon", "moon", "sun", "sun", "sun"],
			["sun", "sun", "sun", "moon", "moon", "moon"],
			["moon", "moon", "moon", "sun", "sun", "sun"]
		];
		expect(checkGameCompletion(board)).toBe(false);
	});
});
