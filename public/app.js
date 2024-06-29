import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {frac} from './frac.js';
import * as fraction from './frac.js';
import vector from './vector.js';
import {complex, printComplex} from './complex.js';
import * as comp from './complex.js';
import operations from "./operations.js";

const inputRegex = /^[0-9i.\/\-+ ]+$/;

/* -------- Event Listeners -------- */

export const createEventListeners = () => {
    document.addEventListener('DOMContentLoaded', function() {
        getTable();

        const submitButton = document.getElementById('submitButton');

        submitButton.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitButton.click();
                console.log('Enter key pressed on submitButton');
            }
        });
    });
}

// Ensures selection is within bounds

export const checkValue = (element) => {
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

// Creates table

export const makeTable = () => {
    document.getElementById('Table Space').innerHTML = '';
    let num_rows = document.getElementById('Rows').value;
    console.log(num_rows);
    let num_cols = document.getElementById('Columns').value;
    console.log(num_cols);
    let table = document.createElement('Table')
    table.setAttribute('id', 'table');
    table.style.margin = 'auto';

    for (let x = 0; x < num_rows; x++) {
        let row = table.insertRow();
        for (let y = 0; y < num_cols; y++) {
        	let cell = row.insertCell();
        	let inputBox = document.createElement('input');
        	inputBox.style.width = '50px';
            inputBox.id = `cell-${x}-${y}` // id is cell-`ROW`-`COLUMN`

        	cell.appendChild(inputBox);
        	cell.style.border = '1px solid black';

        	console.log('test');
        }
    }

    document.getElementById('Table Space').appendChild(table);
}

// Fetches data from table cells and passes each one to the 

export const fetchTable = () => {
    let table = document.getElementById('table');
    let tableData = [];

    let errorCells = [];

    for (let i = 0; i < table.rows.length; i++) {
        let tableRow = table.rows.item(i).cells;
        let rowData = [];
        for (let j = 0; j < tableRow.length; j++) {
            try {
                rowData.push(parseInput(tableRow.item(j).children[0].value));
            }
            catch (error) {
                rowData.push('NULL'); // Not necessary
                errorCells.push(`${i}-${j}`) // ROW-COLUMN of value box to update
            }
        }
        tableData.push(rowData);
    }
}

// Parses strings and converts to matrix, does NOT create divs

export const parseInput = (element) => {
    let oldString = element;

    // Test if regex matches

    if (!inputRegex.test(oldString)) {
        throw new Error('Invalid Character');
    }

    console.log(oldString);
    oldString = oldString.replaceAll(' ', '');

    let currentString = '';
    let currentSign = true;

    let real = '';
    let realSign = true;
    let complex = '';
    let complexSign = true;

    for (let index = 0; index < oldString.length; index++) {
        console.log('GOT HERE')
        let char = oldString.charAt(index);

        if (char === '+') {
            // End of part
            if (currentString.length > 0) {
                if (currentString.includes('i') || currentString.includes('I')) {
                    complex = currentString; // If this happens twice, the user messed up and I don't care
                    complexSign = currentSign;
                    currentString = '';
                }
                else {
                    real = currentString;
                    realSign = currentSign;
                    currentString = '';
                }
                currentSign = true;
            }
            // No else because it doesn't change sign
        }
        else if (char === '-') {
            // End of part
            if (currentString.length > 0) {
                if (currentString.includes('i') || currentString.includes('I')) {
                    complex = currentString; 
                    complexSign = currentSign;
                    currentString = '';
                }
                else {
                    real = currentString;
                    realSign = currentSign;
                    currentString = '';
                }
                currentSign = false;
            }
            else {
                currentSign = !currentSign;
            }
        }
        else {
            currentString += char;
        }

        // Check end and just add whatever
        if ((index + 1) >= oldString.length) {
            if (currentString.length > 0) {
                if (currentString.includes('i') || currentString.includes('I')) {
                    complex = currentString;
                    complexSign = currentSign;
                }
                else {
                    real = currentString;
                    realSign = currentSign;
                }
            }
        }
    }

    console.log('printing real ' + real + ' ' + realSign)
    console.log('printing complex ' + complex + ' ' + complexSign)
    console.log('\n')

    // Returns frac object from String representation

}

export default {
    createEventListeners: createEventListeners,
    checkValue: checkValue,
    makeTable: makeTable,
}
