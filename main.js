import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {frac} from './frac.js';
import * as fraction from './frac.js';
import vector from './vector.js';
import {complex, printComplex} from './complex.js';
import * as comp from './complex.js';
import operations from "./operations.js";

let matrix = [[new complex(new frac(2, 1), new frac(1, 1)), new complex(new frac(1, 1), new frac(0, 1)), new complex(new frac(  5, 2), new frac(1, 1))],
                    [new complex(new frac(2, 1), new frac(1, 1)), new complex(new frac(1, 1), new frac(0, 1)), new complex(new frac(  5, 2), new frac(1, 1))],
                    [new complex(new frac(2, 1), new frac(1, 1)), new complex(new frac(1, 1), new frac(0, 1)), new complex(new frac(  5, 2), new frac(1, 1))]]

reducedRowEchelonComplex(matrix, 0, 0);

function printComp(input) {
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[0].length; y++) {
            printComplex(input[x][y]);
        }
        console.log('\n');
    }
}

function reducedRowEchelonComplex(matrix, i, j) {

    // End iterations if at right end of matrix

    if ((j >= matrix[0].length) || (i >= matrix.length)) {
        console.log("Finished! Returning.")
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
        reducedRowEchelonComplex(matrix, i, j+1);
    }
    else {

        // Finds first nonzero row and permutes with pivot position

        for (let x = i; x < matrix.length; x++) {
            console.log(i + ' ' + j);
            if (!(comp.isNonZeroComplex(matrix[i][j])) && (comp.isNonZeroComplex(matrix[x][j]))) {
                console.log("Permuting rows: " + i + " and " + x);
                matrix = operations.permuteRowOperationComplex(matrix, i, x);
                break;
            }
        }

        console.log("AFTER PERMUTE");
        printComp(matrix);

        // Multiplies the row by reciprocal of pivot point

        if (((fraction.getDecimal(matrix[i][j].re) !== 1) || (fraction.getDecimal(matrix[i][j].im)) !== 1) &&
            ((fraction.getDecimal(matrix[i][j].re) !== 0) || (fraction.getDecimal(matrix[i][j].im)) !== 0)) {
            console.log("SCALING");
            console.log("AFTER SCALE\n\n\n");
            printComp(matrix);
            matrix = operations.scalarOperationComplex(matrix, i, comp.invertComplex(matrix[i][j]));
            console.log('final product after row scale');
            printComp(matrix);
        }

        // Adds multiple of pivot position to other rows

        for (let x = 0; x < matrix.length; x++) {
            console.log('loop');
            console.log(comp.isNonZeroComplex(matrix[x][j]));
            console.log(comp.isNonZeroComplex(matrix[i][j]));
            printComplex(matrix[x][j]);
            printComplex(matrix[i][j]);
            if ((x !== i) && (comp.isNonZeroComplex(matrix[x][j])) && (comp.isNonZeroComplex(matrix[i][j])) && (j < matrix[0].length)) {
                console.log("Row Replacement to row: " + (x+1));
                let product = comp.multiplyComplex(matrix[i][j], matrix[x][j]);
                console.log("ADDING PIVOT BY");
                comp.printComplex(product);
                matrix = operations.rowReplacementOperationComplex(matrix, i, x, comp.negateComplex(product));
                console.log('printing matrix:');
                printComp(matrix);
            }
        }
        console.log('made it here');
        reducedRowEchelonComplex(matrix, i+1, j+1);
    }
}

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
