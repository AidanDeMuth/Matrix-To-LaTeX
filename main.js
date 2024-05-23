import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {frac} from './frac.js';
import * as fraction from './frac.js';
import vector from './vector.js';
import {addComplex, complex, invertComplex, multiplyComplex, negateComplex, subtractComplex} from './complex.js';
import * as comp from './complex.js';

let temp = new complex(new frac(1, 2), new frac(2, 4));
let temp2 = new complex(new frac(1, 2), new frac( 3, 4));
console.log(invertComplex(temp));

/*
let matrix = [[2,-5, 6], [6, 7, 2], [-1, 3, 4]];
matrixOperations.convertInput(matrix);
matrix = matrixOperations.gramSchmidtProcess(matrix);
console.log(matrix);
*/

/*
let temp = new complex(1, 2);
comp.negateComplex(temp);
console.log(temp);
console.log(comp.addComplex(temp, new complex(4, 5)));
console.log(comp.subtractComplex(temp, new complex(1, 1)));
*/


/*
selectOperation = () => {
	var operation = document.getElementById('operation').value;
	console.log(operation);
	console.log("hihihihi");

	let choice = 0;

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
}

checkValue = (element) => {
        let min = element.min;
        let max = element.max;
    
        let value = parseInt(element.value);
        if (value > max) {
          element.value = max;
        } 
        else if (value < min) {
          element.value = min;
        }
      }

getTable = () => {
    document.getElementById('Table Space').innerHTML = '';
    let num_rows = document.getElementById('Rows').value;
    let num_cols = document.getElementById('Columns').value;
    let table = document.createElement('Table')
    table.style.margin = 'auto';

    for (let x = 0; x < num_rows; x++) {
        let row = table.insertRow();
        for (let y = 0; y < num_cols; y++) {
        	let cell = row.insertCell();
        	let input_box = document.createElement('input');
        	input_box.style.width = '50px'

        	cell.appendChild(input_box);
        	cell.style.border = '1px solid black';

        	console.log('test');
        }
    }

    document.getElementById('Table Space').appendChild(table);
}

 */
