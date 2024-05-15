import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {gcd, frac} from './frac.js';

let matrix = [[1, 2, 3, 4, 5],[2, 3, 4, 5 ,6],[3, -8, 4, 6, -1]];
matrixOperations.convertInput(matrix);

console.log(matrix);

let choice = 6;

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
		latexOutput.columnBasisLatex(colBasis);
		break;
	case 4: // Find L.R Rows / Rank. Receives a matrix whos Rows are a basis of row()
		let rowBasis = matrixOperations.matrixRowSpace(matrix);

		latexOutput.rowBasisLatex(rowBasis);
		break;
	case 5: // Find NULLSPACE of a matrix
		let nullBasis = matrixOperations.matrixNullspace(matrix);
		console.log(nullBasis);
		latexOutput.columnBasisLatex(nullBasis);
		break;
	case 6: // Transpose Matrix
		let transpose = matrixOperations.getTranspose(matrix);
		console.log(transpose);


}