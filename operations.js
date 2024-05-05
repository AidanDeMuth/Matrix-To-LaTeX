import {frac, gcd} from './frac.js';

/*
 * Permutes two rows of a given matrix. Parameters are 1-indexed.
 */

export function permuteRowOperation(matrix, i, j) {
	if (i > matrix.length || j > matrix.length) {
		console.log("Rows cannot be greater than matrix size!");
		return matrix;
	}
	else if (i < 0 || j < 0) {
		console.log("Rows cannot be less than zero!");
		return matrix;
	}

	let tempRow = matrix[i];
	matrix[i] = matrix[j];
	matrix[j] = tempRow;
	return matrix;
}

/*
 * Will add n times the value of each element in row i to row j
 */

export function rowReplacementOperation(matrix, i, j, fraction) {
	console.log(i);
	if (i > matrix.length || j > matrix.length) {
		console.log("Rows cannot be greater than matrix size!");
		return matrix;
	}
	else if (i < 0 || j < 0) {
		console.log("Rows cannot be less than zero!");
		return matrix;
	}

	for (let x = 0; x < matrix[0].length; x++) {
		if (matrix[i][x].isNonZero()) {
			let tempMultiplied = matrix[i][x].multiplyFraction(fraction)

			matrix[j][x] = matrix[j][x].addFraction(tempMultiplied);
		}
	}
	return matrix;
}

/*
 * Multiplies a row i by a constant factor of n
 */

function scalarOperation(matrix, i, inverse) {
	console.log("inverse" + inverse.num + " " + inverse.den);
	if (i > matrix.length) {
		console.log("Rows cannot be greater than matrix size!");
		return matrix;
	} 
	else if (i < 0) {
		console.log("Row cannot be less than one!")
		return matrix;
	}
	
	for (let x = 0; x < matrix[0].length; x++) {
		matrix[i][x] = matrix[i][x].multiplyFraction(inverse);
	}
	return matrix;
}

export default {
	permuteRowOperation: permuteRowOperation,
	rowReplacementOperation: rowReplacementOperation,
	scalarOperation: scalarOperation
}
