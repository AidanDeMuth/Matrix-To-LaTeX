import {frac, gcd} from './frac.js';
import operations from './operations.js';

/*
 * Reduces a matrix of any dimension to RREF
 */

function reducedRowEchelon(matrix, i, j) {
	// End iterations if at right end of matrix
	if ((j >= matrix[0].length) || (i >= matrix.length)) {
		console.log("Finished! Returning Matrix.")
		return matrix;
	}

	// Checks if the pivot and down is all zero
	let hasNonZero = false;
	for (let x = i; x < matrix.length; x++) {
		if (matrix[x][j].isNonZero()) {
			hasNonZero = true;
		}
	}


	if (!hasNonZero) {
		reducedRowEchelon(matrix, i, j+1);
	}
	else {
		// Finds first nonzero row and permutes with pivot position
		for (let x = i; x < matrix.length; x++) {
			if (!(matrix[i][j].isNonZero()) && (matrix[x][j].isNonZero())) {
				console.log("Permuting rows: " + i + " and " + x);
				matrix = operations.permuteRowOperation(matrix, i, x);
				printMatrix(matrix);
				break;
			}
		}

		// Multiplies the row of the pivot position by the
		// reciprocal of the pivot point
		if (((matrix[i][j].getDecimal()) != 1) && ((matrix[i][j].getDecimal()) != 0)) {
			console.log("Scaling row: " + (i+1));
			matrix = operations.scalarOperation(matrix, i, matrix[i][j].invertFraction());
			printMatrix(matrix);
		}

		// Loops to add to the other rows to reduce
		for (let x = 0; x < matrix.length; x++) {
			if ((x != i) && (matrix[x][j].isNonZero()) && (matrix[i][j].isNonZero()) && (j < matrix[0].length)) {
				console.log("Row Replacement to row: " + (x+1));
				let product = matrix[i][j].multiplyFraction(matrix[x][j]);
				matrix = operations.rowReplacementOperation(matrix, i, x, 
																					 product.negateFraction());
				printMatrix(matrix);
			}
		}

		reducedRowEchelon(matrix, i+1, j+1);
	}	
}

function reducedRowEchelonAugmented(matrix, i, j) {
	// End iterations if at right end of matrix
	if ((j >= matrix[0].length-1) || (i >= matrix.length)) {
		console.log("Finished! Returning Matrix.")
		return matrix;
	}

	// Checks if the pivot and down is all zero
	let hasNonZero = false;
	for (let x = i; x < matrix.length; x++) {
		if (matrix[x][j].isNonZero()) {
			hasNonZero = true;
		}
	}


	if (!hasNonZero) {
		reducedRowEchelonAugmented(matrix, i, j+1);
	}
	else {
		// Finds first nonzero row and permutes with pivot position
		for (let x = i; x < matrix.length; x++) {
			if (!(matrix[i][j].isNonZero()) && (matrix[x][j].isNonZero())) {
				console.log("Permuting rows: " + i + " and " + x);
				matrix = operations.permuteRowOperation(matrix, i, x);
				printMatrix(matrix);
				break;
			}
		}

		// Multiplies the row of the pivot position by the
		// reciprocal of the pivot point
		if (((matrix[i][j].getDecimal()) != 1) && ((matrix[i][j].getDecimal()) != 0)) {
			console.log("Scaling row: " + (i+1));
			matrix = operations.scalarOperation(matrix, i, matrix[i][j].invertFraction());
			printMatrix(matrix);
		}

		// Loops to add to the other rows to reduce
		for (let x = 0; x < matrix.length; x++) {
			if ((x != i) && (matrix[x][j].isNonZero()) && (matrix[i][j].isNonZero()) && (j < matrix[0].length)) {
				console.log("Row Replacement to row: " + (x+1));
				let product = matrix[i][j].multiplyFraction(matrix[x][j]);
				matrix = operations.rowReplacementOperation(matrix, i, x, 
																					 product.negateFraction());
				printMatrix(matrix);
			}
		}

		reducedRowEchelonAugmented(matrix, i+1, j+1);
	}	
}


function convertInput(matrix) {
	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			matrix[x][y] = new frac(matrix[x][y], 1);
		}
	}
	return matrix;
}

/*
 * Will simply print out a matrix row by row
 */

function printMatrix(matrix) {
	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			if (matrix[x][y].den == 1) {
				process.stdout.write(matrix[x][y].num + "\t");
			}
			else {
				process.stdout.write(matrix[x][y].num + "/" + matrix[x][y].den);
			}
		}
		console.log();
	}
	console.log();
}


let matrix = [[1,3,7,9],[-4,5,-11,19],[3,-5,9,1],[-9,3,7,-1]];

matrix = convertInput(matrix);
reducedRowEchelonAugmented(matrix, 0, 0);