import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {frac} from './frac.js';
import * as fraction from './frac.js';
import vector from './vector.js';
import {complex, printComplex} from './complex.js';
import * as comp from './complex.js';
import operations from "./operations.js";

let matrix = [[new complex(new frac(1, 1), new frac(1, 1)), new complex(new frac(2, 1), new frac(4, 1)), new complex(new frac(  3, 1), new frac(1, 1))],
			  [new complex(new frac(1, 1), new frac(1, 1)), new complex(new frac(2, 1), new frac(4, 2)), new complex(new frac(  4, 1), new frac(1, 1))],
			  [new complex(new frac(1, 1), new frac(1, 1)), new complex(new frac(2, 1), new frac(4, 1)), new complex(new frac(  3, 1), new frac(1, 1))]];

latexOutput.columnBasisLatex(matrix);

/*

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
