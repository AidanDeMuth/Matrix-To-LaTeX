/*
 * Permutes two rows of a given matrix. Parameters are 1-indexed.
 */

function permuteRowOperation(matrix, i, j) {
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
 * Will add n times the value of each element in row i to row j. Parameters
 * are 1-indexed.
 */

function rowReplacementOperation(matrix, i, j, n) {
	if (i > matrix.length || j > matrix.length) {
		console.log("Rows cannot be greater than matrix size!");
		return matrix;
	}
	else if (i < 0 || j < 0) {
		console.log("Rows cannot be less than zero!");
		return matrix;
	}

	for (let x = 0; x < matrix[0].length; x++) {
		if (matrix[i][x] != 0) {
			matrix[j][x] += n * matrix[i][x]; 
		}
	}
	return matrix;
}

/*
 * Multiplies a row i by a constant factor of n. Parameters are 1-indexed.
 */

function scalarOperation(matrix, i, n) {
	if (i > matrix.length) {
		console.log("Rows cannot be greater than matrix size!");
		return matrix;
	} 
	else if (i < 0) {
		console.log("Row cannot be less than one!")
		return matrix;
	}
	
	for (let x = 0; x < matrix[0].length; x++) {
		matrix[i][x] *= n;
	}
	return matrix;
}

/*
 * Will simply print out a matrix row by row
 */

function printMatrix(matrix) {
	console.log(matrix.join('\n'));
}


/*
 * Reduces a matrix of any dimension to RREF
 */

function reducedRowEchelon(matrix, i, j) {
	// End iterations if at right end of matrix
	if ((j >= matrix[0].length) || (i >= matrix.length)) {
		return matrix;
	}

	// Checks if the pivot and down is all zero
	let hasNonZero = false;
	for (let x = i; x < matrix.length; x++) {
		if (matrix[x][j] != 0) {
			hasNonZero = true;
		}
	}
	if (!hasNonZero) {
		reducedRowEchelon(matrix, i, j+1);
	}

	// Finds first nonzero row and permutes with pivot position
	for (let x = i; x < matrix.length; x++) {
		console.log("Current row and column:\n" +i+ " and " +j);
		if ((matrix[i][j] == 0) && (matrix[x][j] != 0)) {
			console.log("Got here");
			matrix = permuteRowOperation(matrix, i, x);
			console.log(x +" "+ j);
			console.log("Swapping rows:\n" +x+ " and " +j);
			printMatrix(matrix);
			break;
		}
	}

	// Multiplies the row of the pivot position by the
	// reciprocal of the pivot point
	if ((matrix[i][j] != 1) && (matrix[i][j] != 0)) {
		matrix = scalarOperation(matrix, i, 1 / matrix[i][j]);
		console.log(i +" "+ j);
		console.log("Scalar operation:\n")
		printMatrix(matrix);
	}

	// Loops to add to the other rows to reduce
	for (let x = 0; x < matrix.length; x++) {
		if ((x != i) && (matrix[x][j] != 0) && (j < matrix[0].length)) {
			rowReplacementOperation(matrix, i, x, (-1)*(matrix[i][j] * matrix[x][j]));
			console.log("row" + i +" "+ "col" +j);
			console.log("Replacement operation");
			printMatrix(matrix);
		}
	}

	console.log("Reprinting matrix");
	reducedRowEchelon(matrix, i+1, j+1);
}

/*
 * Euclid's algorithm to get the greatest common divisor.
 *
 */

/*
function gcd(a, b) {
  if (!b) return a;

  return gcd(b, a % b);
};
*/

/*
 * Reduces an augmented matrix of any dimension to RREF
 */

function findDeterminant(matrix) {

}

var matrix = [[1,0,0,0,0],[0,0,0,1,0],[0,0,1,0,0]];
var matrix = [[1,2,3],[4,5,6],[7,8,9]];
reducedRowEchelon(matrix, 0, 0);


