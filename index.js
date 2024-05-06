import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {gcd, frac} from './frac.js';

let input = [[3, 5, -6, 5],[4, 3, -2, 5],[7, -5, 2, 9],[7, -5, 2, 9]];
matrixOperations.convertInput(input);

let matrix = [[3, 5, -6, 5],[4, 3, -2, 5],[7, -5, 2, 9],[7, -5, 2, 9]];
matrixOperations.convertInput(matrix);

console.log(matrix);

let choice = 0;

switch (choice) {
	// Row reduction
	case 0: 
		matrixOperations.reducedRowEchelon(matrix, 0, 0);
		latexOutput.matrixLatex(matrix);
		latexOutput.basisLatex(matrix);
		break;
	// Augmented matrix
	case 1:
		matrixOperations.reducedRowEchelonAugmented(matrix, 0, 0);
		latexOutput.matrixLatex(matrix);
		break;
	// Find determinant
	case 2:
		let multiplicity = matrixOperations.calculateDeterminant(matrix, 0, 0);
		console.log(multiplicity);
		break;
	// Find L.I Cols / Rank. Receives a matrix whose columns are basis of col
	case 3:
		let basis = matrixOperations.matrixColumnSpace(matrix);
		console.log(basis);
		console.log("Rank is " + basis[0].length);
		latexOutput.basisLatex(basis);
		break;

}