export type Constraint = { type: "=" | "x"; position: "horizontal" | "vertical" };

const BOARD_SIZE = 6;

function isValidConstraint(key: string, boardSize: number = BOARD_SIZE): boolean {
	const [cellA, cellB] = key.split("-");
	const [r1, c1] = cellA.split(",").map(Number);
	const [r2, c2] = cellB.split(",").map(Number);

	// Invalid if any cell is on the border (row or column equals 0 or BOARD_SIZE - 1)
	if (r1 === 0 || c1 === 0 || r1 === boardSize - 1 || c1 === boardSize - 1) return false;
	if (r2 === 0 || c2 === 0 || r2 === boardSize - 1 || c2 === boardSize - 1) return false;
	return true;
}

export class ValidatedConstraint {
	public key: string;
	public constraint: Constraint;

	constructor(key: string, constraint: Constraint, boardSize: number = BOARD_SIZE) {
		if (!isValidConstraint(key, boardSize)) {
			throw new Error(`Invalid constraint: ${key}`);
		}
		this.key = key;
		this.constraint = constraint;
	}
}

const rawConstraints: Record<string, Constraint> = {
	"0,0-0,1": { type: "x", position: "horizontal" },
	"1,1-1,2": { type: "=", position: "horizontal" },
	"2,2-3,2": { type: "x", position: "vertical" }
};

export const CONSTRAINTS: Record<string, Constraint> = Object.fromEntries(
	Object.entries(rawConstraints).flatMap(([key, constraint]) => {
		try {
			const vc = new ValidatedConstraint(key, constraint);
			return [[vc.key, vc.constraint]];
		} catch (e) {
			// Skip invalid constraints
			return [];
		}
	})
);

// Optionally keep helper functions:
export function validateConstraint(key: string, boardSize: number = BOARD_SIZE): boolean {
	return isValidConstraint(key, boardSize);
}

export function areConstraintsValid(constraints: Record<string, Constraint>, boardSize: number = BOARD_SIZE): boolean {
	return Object.keys(constraints).every(key => validateConstraint(key, boardSize));
}
