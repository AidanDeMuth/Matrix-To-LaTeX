import {frac} from './frac.js';
import * as fraction from './frac.js';

/*
 * Permutes two rows of a given matrix. Parameters are 1-indexed.
 */

export function permuteRowOperation(matrix, i, j) {
	let tempRow = matrix[i];
	matrix[i] = matrix[j];
	matrix[j] = tempRow;
	return matrix;
}

/*
 * Will add n times the value of each element in row i to row j
 */

export function rowReplacementOperation(matrix, i, j, scalar) {
	for (let x = 0; x < matrix[0].length; x++) {
		console.log(matrix);
		console.log(matrix[i][x]);
		if (fraction.isNonZero(matrix[i][x])) {
			let tempMultiplied = fraction.multiplyFraction(matrix[i][x], scalar)

			matrix[j][x] = fraction.addFraction(matrix[j][x], tempMultiplied);
		}
	}
	return matrix;
}

/*
 * Multiplies a row i by a scalar fraction {inverse}
 */

function scalarOperation(matrix, i, inverse) {
	for (let x = 0; x < matrix[0].length; x++) {
		matrix[i][x] = fraction.multiplyFraction(matrix[i][x], inverse);
	}
	return matrix;
}

export default {
	permuteRowOperation: permuteRowOperation,
	rowReplacementOperation: rowReplacementOperation,
	scalarOperation: scalarOperation
}
