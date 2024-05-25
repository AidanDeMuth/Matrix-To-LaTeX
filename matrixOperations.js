import {frac} from './frac.js';
import * as fraction from './frac.js'
import operations from './operations.js';
import vector from './vector.js';
import {complex} from "./complex.js";
import * as comp from "./complex.js";

import * as main from "./main.js";

/* ------------ Matrix Solution Operations ------------ */

/*
 * Reduces matrix to RREF, implemented recursively. Thus, no return value.
 * Operates with a matrix array of complex numbers, and two beginning zeroes to start the recursion.
 */

export function reducedRowEchelon(matrix, i, j) {

	// End iterations if at right end of matrix

	if ((j >= matrix[0].length) || (i >= matrix.length)) {
		console.log('Matrix is reduced.');
		printMatrix(matrix);
		return;
	}

	// Checks if the pivot position down is all zero

	let hasNonZero = false;
	for (let x = i; x < matrix.length; x++) {
		if (comp.isNonZeroComplex(matrix[x][j])) {
			hasNonZero = true;
		}
	}

	// If it doesn't have a nonzero, move pivot one right

	if (!hasNonZero) {
		reducedRowEchelon(matrix, i, j+1);
	}
	else {

		// Finds first nonzero row and permutes with pivot position

		for (let x = i; x < matrix.length; x++) {
			if (!(comp.isNonZeroComplex(matrix[i][j])) && (comp.isNonZeroComplex(matrix[x][j]))) {
				console.log('Permuting Rows ' + i + ' and ' + x);
				printMatrix(matrix);
				matrix = operations.permuteRowOperationComplex(matrix, i, x);
				break;
			}
		}

		// Multiplies the row by reciprocal of pivot point

		if ((!(fraction.getDecimal(matrix[i][j].re) !== 1) != !(fraction.getDecimal(matrix[i][j].im)) !== 1) &&
			(!(fraction.getDecimal(matrix[i][j].re) !== 0) != !(fraction.getDecimal(matrix[i][j].im)) !== 0)) {
			console.log('Scaling row ' + i);
			printMatrix(matrix);
			matrix = operations.scalarOperationComplex(matrix, i, comp.invertComplex(matrix[i][j]));
		}

		// Adds multiple of pivot position to every other nonzero row

		for (let x = 0; x < matrix.length; x++) {
			if ((x !== i) && (comp.isNonZeroComplex(matrix[x][j])) && (comp.isNonZeroComplex(matrix[i][j])) && (j < matrix[0].length)) {
				console.log('Replacing row ' + x + ' by a multiple of ' + i);
				printMatrix(matrix);
				let product = comp.multiplyComplex(matrix[i][j], matrix[x][j]);
				matrix = operations.rowReplacementOperationComplex(matrix, i, x, comp.negateComplex(product));
			}
		}

		reducedRowEchelon(matrix, i+1, j+1);
	}
}

/*
 * Reduces Matrix to RREF in the form of Ax=b. Recursively implemented, thus no return value.
 * Operates with a matrix array of complex numbers, and zeros for i, j.
 */

export function reducedRowEchelonAugmented(matrix, i, j) {

	// End iterations if at right end of matrix

	if ((j >= matrix[0].length - 1) || (i >= matrix.length)) {
		return;
	}

	// Checks if the pivot position down is all zero

	let hasNonZero = false;
	for (let x = i; x < matrix.length; x++) {
		if (comp.isNonZeroComplex(matrix[x][j])) {
			hasNonZero = true;
		}
	}

	// If it doesn't have a nonzero, move pivot one right

	if (!hasNonZero) {
		reducedRowEchelonAugmented(matrix, i, j+1);
	}
	else {

		// Finds first nonzero row and permutes with pivot position

		for (let x = i; x < matrix.length; x++) {
			if (!(comp.isNonZeroComplex(matrix[i][j])) && (comp.isNonZeroComplex(matrix[x][j]))) {
				matrix = operations.permuteRowOperationComplex(matrix, i, x);
				break;
			}
		}

		// Multiplies the row by reciprocal of pivot point

		if (((fraction.getDecimal(matrix[i][j].re) !== 1) || (fraction.getDecimal(matrix[i][j].im)) !== 1) &&
			((fraction.getDecimal(matrix[i][j].re) !== 0) || (fraction.getDecimal(matrix[i][j].im)) !== 0)) {
			matrix = operations.scalarOperationComplex(matrix, i, comp.invertComplex(matrix[i][j]));
		}

		// Adds multiple of pivot position to every other nonzero row

		for (let x = 0; x < matrix.length; x++) {
			if ((x !== i) && (comp.isNonZeroComplex(matrix[x][j])) && (comp.isNonZeroComplex(matrix[i][j])) && (j < matrix[0].length)) {
				let product = comp.multiplyComplex(matrix[i][j], matrix[x][j]);

				matrix = operations.rowReplacementOperationComplex(matrix, i, x, comp.negateComplex(product));
			}
		}

		reducedRowEchelonAugmented(matrix, i+1, j+1);
	}
}

/* ------------ Determinant Operations ------------ */


/*
function calculateDeterminant(matrix) {
	multiplicity = new frac(1, 1);
	reducedRowEchelonDeterminant(matrix, 0, 0, multiplicity);
	return multiplicity;
}

function calculateDeterminant(matrix) {
	var multiplicity = new complex(new frac(1, 1), new frac(1, 1));
	multiplicity = reducedRowEchelonDeterminant(matrix, 0, 0, multiplicity);
	console.log(multiplicity);
	return multiplicity;
}

function reducedRowEchelonDeterminant(matrix, i, j, multiplicity) {
	console.log('here it is');
	console.log(multiplicity);
	if ((i >= matrix.length) || (j >= matrix[0].length)) {
		return multiplicity;
	}

	// Checks if the pivot and down is all zero

	let hasNonZero = false;

	for (let x = 0; x < matrix.length; x++) {
		if (comp.isNonZeroComplex(matrix[x][j])) {
			hasNonZero = true;
		}
	}
	if (!hasNonZero) {
		comp.multiplyComplex(multiplicity, new complex(new frac(0, 1), new frac(0, 1)));
		return reducedRowEchelonDeterminant(matrix, i+1, j+1, multiplicity);
	}
	else {

		// Finds first nonzero row and permutes with pivot position

		for (let x = i; x < matrix.length; x++) {
			if (!(comp.isNonZeroComplex(matrix[i][j])) && (comp.isNonZeroComplex(matrix[x][j]))) {
				matrix = operations.permuteRowOperationComplex(matrix, i, x);
				comp.multiplyComplex(multiplicity, new complex(new frac(-1, 1), new frac(-1, 1)));
				break;
			}
		}

		// Multiplies the row by reciprocal of pivot point

		if (((fraction.getDecimal(matrix[i][j].re) !== 1) || (fraction.getDecimal(matrix[i][j].im)) !== 1) &&
			((fraction.getDecimal(matrix[i][j].re) !== 0) || (fraction.getDecimal(matrix[i][j].im)) !== 0)) {
			matrix = operations.scalarOperationComplex(matrix, i, comp.invertComplex(matrix[i][j]));
			comp.multiplyComplex(multiplicity, matrix[i][j]);
		}

		// Adds multiple of pivot position to every other nonzero row

		for (let x = 0; x < matrix.length; x++) {
			if ((x !== i) && (comp.isNonZeroComplex(matrix[x][j])) && (comp.isNonZeroComplex(matrix[i][j])) && (j < matrix[0].length)) {
				let product = comp.multiplyComplex(matrix[i][j], matrix[x][j]);

				matrix = operations.rowReplacementOperationComplex(matrix, i, x, comp.negateComplex(product));
			}
		}
		if (!(comp.isNonZeroComplex(matrix[i][j]))) {
			comp.multiplyComplex(multiplicity, new complex(new frac(0, 1), new frac(0, 1)));
			return;
		}

		return reducedRowEchelonDeterminant(matrix, i+1, j+1, multiplicity);
	}
}
 */


/* ------------ Matrix Rank / Span Functions ------------ */

/*
 * Given a matrix, returns a matrix of the rows that form a basis
 */

export function matrixColumnSpace(matrix) {
	let matrixCopy = copyMatrix(matrix);
	let pivots = getPivots(matrixCopy);

	console.log(pivots);	

	let newMatrix = []; // matrix of frac objects

	for (let x = 0; x < matrix.length; x++) {
		let rowArr = [];
		let pivotTally = 0;
		for (let y = 0; y < matrix[0].length; y++) {
			if (y === pivots[pivotTally]) {
				rowArr.push(matrix[x][y]);
				pivotTally++;
			}
		}
		newMatrix.push(rowArr);
	}

	return newMatrix;
}

/*
 * Returns a matrix consisting of only the row basis vectors
 */

export function matrixRowSpace(matrix) {
	let matrixCopy = copyMatrix(matrix);
	let pivots = getPivots(matrixCopy);

	console.log(pivots);	
	let newMatrix = [];
	for (let x = 0; x < pivots.length; x++) {
		let rowArr = [];
		for (let y = 0; y < matrixCopy[0].length; y++) {
			console.log("length" + matrixCopy[0].length);
			rowArr.push(matrixCopy[x][y]);
		}
		newMatrix.push(rowArr);
	}

	return newMatrix;
}

/*
 * Returns a new matrix that represents the basis vectors of the nullspace.
 */


export function matrixNullspace(matrix) {
	let matrixCopy = copyMatrix(matrix);
	reducedRowEchelon(matrixCopy, 0, 0);
	let pivots = getPivots(matrixCopy);

	let newMatrix = [];
	let pivotTally = 0;
	let nonPivotTally = 0;

	let x = 0;
	while (x < matrixCopy[0].length) {
		let rowArr = [];

		if (pivots.includes(x)) {
			for (let y = 0; y < matrixCopy[0].length; y++) {
				if (!pivots.includes(y)) {
					rowArr.push(comp.negateComplex(matrixCopy[pivotTally][y]));
				}
			}
			pivotTally++;
		}
		else if (!pivots.includes(x)) {
			for (let y = 0; y < (matrixCopy[0].length - pivots.length); y++) {
				if (y === nonPivotTally) {
					rowArr.push(new complex(new frac(1, 1), new frac(0, 1)));
				}
				else {
					rowArr.push(new complex(new frac(0, 1), new frac(0, 1)));
				}
			}
			nonPivotTally++;
		}

		x++;
		newMatrix.push(rowArr);
	}

	return newMatrix;
}

/* ------------ Vector Space Operations ------------ */

/*
 * Given a matrix, will perform the gram-schmidt process and return
 * a set of orthogonal vectors.
 */

export function gramSchmidtProcess(matrix) {

	// Transpose so we can operate on vectors as rows

	let vectors = getTranspose(matrix);
	console.log('vectors');
	console.log(vectors);

	for (let x = 0; x < vectors.length; x++) {
		for (let y = 0; y < x; y++) {
			console.log(x);
			vectors[x] = vector.subtractVector(vectors[x], vector.projectVector(vectors[x], vectors[y]));
		}
	}

	// Transpose back to regular matrix

	return getTranspose(vectors);
}


/* ------------ Matrix Format Functions ------------ */


export function printMatrix(matrix) {
	let printString = ``;

	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			if (comp.hasReal(matrix[x][y]) && comp.hasComplex(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].re)) {
					printString += `${matrix[x][y].re.num}/${matrix[x][y].re.den} `;
				}
				else {
					printString += `${matrix[x][y].re.num} `;
				}

				if (fraction.isFraction(matrix[x][y].im)) {
					printString += `+ ${matrix[x][y].im.num}/${matrix[x][y].im.den}i\t `;
				}
				else {
					printString += `+ ${matrix[x][y].im.num}i\t `;
				}
			}
			else if (comp.hasReal(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].re)) {
					printString += `${matrix[x][y].re.num}/${matrix[x][y].re.den}\t `;
				}
				else {
					printString += `${matrix[x][y].re.num}\t `;
				}

			}
			else if (comp.hasComplex(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].re)) {
					printString += `+ ${matrix[x][y].re.num}/${matrix[x][y].re.den}i\t `;
				}
				else {
					printString += `+ ${matrix[x][y].re.num}i\t `;
				}
			}
			else {
				if (!comp.isNonZeroComplex(matrix[x][y])) {
					printString += ` 0\t `;
				}
			}
		}
		printString += `\n`;
	}

	console.log(printString);
}


export function copyMatrix(matrix) {
	let matrixCopy = [];
	for (let x = 0; x < matrix.length; x++) {
		let newArr = [];
		for (let y = 0; y < matrix[0].length; y++) {
			let tempFrac = new complex(new frac(matrix[x][y].re.num, matrix[x][y].re.den),
				new frac(matrix[x][y].im.num, matrix[x][y].im.den));
			newArr.push(tempFrac);
		}
		matrixCopy.push(newArr);
	}
	return matrixCopy;
}

/*
 * Returns a transposed matrix
 */

export function getTranspose(matrix) {
	let matrixCopy = copyMatrix(matrix);
	let newMatrix = [];

	for (let x = 0; x < matrixCopy[0].length; x++) {
		let rowArr = [];
		for (let y = 0; y < matrix.length; y++) {
			rowArr.push(matrixCopy[y][x]);
		}
		newMatrix.push(rowArr);
	}

	return newMatrix;
}

/*
 * Returns an array of 0-indexed pivot positions.
 */

export function getPivots(matrix) {
	let matrixCopy = copyMatrix(matrix);
	reducedRowEchelon(matrixCopy, 0, 0);
	let pivots = [];

	let i = 0; // rows
	let j = 0; // cols
	while ((i < matrixCopy.length) && (j < matrixCopy[0].length)) {
		if ((matrixCopy[i][j].re.num === 1) && (matrixCopy[i][j].re.den === 1) &&
			(matrixCopy[i][j].im.num === 0) && (matrixCopy[i][j].im.den === 1)) { // move 1 right 1 down
			pivots.push(j);
			i++;
			j++;
		}
		else { // move 1 right only
			j++;
		}
	}

	return pivots;
}

export default {
	reducedRowEchelon: reducedRowEchelon,
	reducedRowEchelonAugmented: reducedRowEchelonAugmented,
	matrixColumnSpace: matrixColumnSpace,
	matrixRowSpace: matrixRowSpace,
	matrixNullspace: matrixNullspace,
	gramSchmidtProcess: gramSchmidtProcess,
	printMatrix: printMatrix,
	copyMatrix: copyMatrix,
	getTranspose: getTranspose,
	getPivots: getPivots
}