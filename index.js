import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {gcd, frac} from './frac.js';
import vector from './vector.js';

import express from 'express';
const app = express();
const port = 3000;
app.use(express.static('/'));


selectOperation = () => {
	var operation = document.getElementById('operation').value;
	console.log(operation);
}

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
		break
	case 7: // testing
		console.log(matrix);
		let gram = matrixOperations.gramSchmidtProcess(matrix);
		for (let x = 0; x < gram.length; x++) {
			vector.simplifyVector(gram[x]);
		}
		matrixOperations.printMatrix(gram);
		break;
}
