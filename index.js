import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {gcd, frac} from './frac.js';

let input = [[1, 2, 3, 4, 5],[2, 3, 4, 5 ,6],[3, -8, 4, 6, -1]];
matrixOperations.convertInput(input);

let matrix = [[1, 2, 3, 4, 5],[2, 3, 4, 5 ,6],[3, -8, 4, 6, -1]];
matrixOperations.convertInput(matrix);

console.log(matrix);

let choice = 3;

switch (choice) {
	case 0: // Row reduction
		matrixOperations.reducedRowEchelon(matrix, 0, 0);
		latexOutput.matrixLatex(matrix);
		latexOutput.basisLatex(matrix);
		break;
	case 1: // Augmented matrix
		matrixOperations.reducedRowEchelonAugmented(matrix, 0, 0);
		latexOutput.matrixLatex(matrix);
		break;
	case 2: // Find determinant
		let multiplicity = matrixOperations.calculateDeterminant(matrix, 0, 0);
		console.log(multiplicity);
		break;
	case 3: // Find L.I Cols / Rank. Receives a matrix whose columns are basis of col()
		let colBasis = matrixOperations.matrixColumnSpace(matrix);
		console.log(colBasis);
		console.log("Rank is " + colBasis[0].length);
		latexOutput.columnBasisLatex(colBasis);
		break;
	case 4: // Find L.R Rows / Rank. Receives a matrix whos Rows are a basis of row()
		let rowBasis = matrixOperations.matrixColumnSpace(matrix);
		console.log("rank is " + rowBasis[0].length);
		console.log(rowBasis);
		latexOutput.rowBasisLatex(rowBasis);
}