import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';
import {frac} from './frac.js';
import * as fraction from './frac.js';
import vector from './vector.js';
import {complex} from './complex.js';
import * as comp from './complex.js';
import operations from "./operations.js";

const complexRegex = /^[0-9iI\(\).\/\-+ ]+$/;
const fracRegex = /^(?:(?:0|[1-9]\d*)(?:[.,]\d+)?|[1-9]\d*\/[1-9]\d*)$/;

/* -------- Event Listeners -------- */

export const createEventListeners = () => {
    document.addEventListener('DOMContentLoaded', function() {
        makeTable();

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
    let num_cols = document.getElementById('Columns').value;
    let table = document.createElement('Table')

    table.setAttribute('id', 'table');
    table.style.margin = 'auto';
    
    for (let x = 0; x < num_rows; x++) {
        let row = table.insertRow();
        for (let y = 0; y < num_cols; y++) {
        	let cell = row.insertCell();
        	let inputBox = document.createElement('input');

            inputBox.type = 'text';
        	inputBox.style.width = '50px';
            inputBox.id = `cell-${x}-${y}` // id is cell-`ROW`-`COLUMN`
            inputBox.onclick = function () {this.style.backgroundColor = 'white'};

        	cell.appendChild(inputBox);
        	cell.style.border = '1px solid black';
        }
    }
    
    document.getElementById('Table Space').appendChild(table);
}

export const outputHandler = () => {
    // All Data / Error Cells
    let tableData = processTable();

    if (tableData[1].length > 0) {
        console.log('got in here');
        let errorCells = tableData[1];
        for (let i = 0; i < errorCells.length; i++) {
            console.log(errorCells[i] + ' error');
            let element = document.getElementById(`cell-${errorCells[i]}`);
            element.style.backgroundColor = 'red';
        }

        return;
    }

    let bracketType = document.getElementById('bracketType').value;
    let operation =  Number(document.getElementById('operation').value);

    switch(operation) {
        case 0: // Custom
            break;
        case 1: // RREF



    }
}

/*
 * Fetches data from table cells and passes each to the parser.
 */ 

export const processTable = () => {
    let table = document.getElementById('table');
    let tableData = [];

    let errorCells = [];

    for (let i = 0; i < table.rows.length; i++) {
        let tableRow = table.rows.item(i).cells;
        let rowData = [];
        for (let j = 0; j < tableRow.length; j++) {
            console.log('running ' + i + ' ' + j)
            try {
                rowData.push(parseInput(tableRow.item(j).children[0].value));
            }
            catch (error) {
                rowData.push(error.message);
                errorCells.push(`${i}-${j}`) // ROW-COLUMN of value box to update
            }
        }
        tableData.push(rowData);
    }

    return [tableData, errorCells];
}

// Parses strings and converts to matrix, does NOT create divs

export const parseInput = (element) => {
    let oldString = element;

    // Test if regex matches

    if (!complexRegex.test(oldString)) {
        throw new Error('Invalid Character');
    }

    console.log(oldString);
    oldString = oldString.replaceAll(' ', '');
    oldString = oldString.replaceAll('I', 'i');

    let currentString = '';
    let currentSign = true;

    let real = '';
    let realSign = true;
    let imaginary = '';
    let imaginarySign = true;

    for (let index = 0; index < oldString.length; index++) {
        let char = oldString.charAt(index);

        if (char === '+') {
            // End of part
            if (currentString.length > 0) {
                if (currentString.includes('i')) {
                    imaginary = currentString; // If this happens twice, the user messed up and I don't care
                    imaginarySign = currentSign;
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
                if (currentString.includes('i')) {
                    imaginary = currentString; 
                    imaginarySign = currentSign;
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
                if (currentString.includes('i')) {
                    imaginary = currentString;
                    imaginarySign = currentSign;
                }
                else {
                    real = currentString;
                    realSign = currentSign;
                }
            }
        }
    }

    // Remove the 'i' from the complex number and add '1' if that is all

    if (imaginary === 'i') {
        imaginary = '1';
    }
    else {
        imaginary = imaginary.replaceAll('i', '');
    }

    if ((real) && !fracRegex.test(real)) {
        throw new Error('Invalid Fraction');
    }
    if ((imaginary) && !fracRegex.test(imaginary)) {
        throw new Error('Invalid Fraction');
    }

    let realFrac = null;
    let imaginaryFrac = null;

    if (real) {
        realFrac = real.includes('/') ? fraction.stringToFraction(real) : fraction.decimalToFraction(real);
    }
    else {
        realFrac = new frac(0, 1);
    }

    console.log('test');

    if (imaginary) {
        imaginaryFrac = imaginary.includes('/') ? fraction.stringToFraction(imaginary) : fraction.decimalToFraction(imaginary);
    }
    else {
        imaginaryFrac = new frac(0, 1);
    }

    realFrac = realSign ? realFrac : fraction.negateFraction(realFrac);
    imaginaryFrac = imaginarySign ? imaginaryFrac : fraction.negateFraction(imaginaryFrac);

    comp.printComplex(new complex(realFrac, imaginaryFrac));

    return new complex(realFrac, imaginaryFrac);
}

/* ------------- Styling Functions ------------- */

export const changeColor = (element, color) => {
    element.backgroundColor = `${color}`;
}

export default {
    createEventListeners: createEventListeners,
    checkValue: checkValue,
    makeTable: makeTable,
    outputHandler: outputHandler,
    changeColor: changeColor
}
