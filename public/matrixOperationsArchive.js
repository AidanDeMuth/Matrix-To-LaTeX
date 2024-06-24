/*

import * as fraction from "./frac.js";
import operations from "./operations.js";


function reducedRowEchelon(matrix, i, j) {

    // End iterations if at right end of matrix

    if ((j >= matrix[0].length) || (i >= matrix.length)) {
        console.log("Finished! Returning.")
        return;
    }

    // Checks if the pivot position down is all zero

    let hasNonZero = false;
    for (let x = i; x < matrix.length; x++) {
        if (fraction.isNonZero(matrix[x][j])) {
            hasNonZero = true;
        }
    }

    // If it doesn't have a nonzero, move pivot one right

    if (!hasNonZero) {
        reducedRowEchelon(matrix, i, j+1);
    }
    else {

        // Finds first nonzero row and permutes with pivot position

        for (let x = i; x < matrix.length; x++) {
            console.log(matrix);
            console.log(i + ' ' + j);
            if (!(fraction.isNonZero(matrix[i][j])) && (fraction.isNonZero(matrix[x][j]))) {
                console.log("Permuting rows: " + i + " and " + x);
                matrix = operations.permuteRowOperation(matrix, i, x);
                printMatrix(matrix);
                break;
            }
        }

        // Multiplies the row by reciprocal of pivot point

        if (((fraction.getDecimal(matrix[i][j])) !== 1) && ((fraction.getDecimal(matrix[i][j])) !== 0)) {
            console.log("Scaling row: " + (i+1));
            console.log("Before inverse: " + matrix[i][j].num + " " + matrix[i][j].den);
            matrix = operations.scalarOperation(matrix, i, fraction.invertFraction(matrix[i][j]));
            printMatrix(matrix);
        }

        // Adds multiple of pivot position to other rows

        for (let x = 0; x < matrix.length; x++) {
            if ((x !== i) && (fraction.isNonZero(matrix[x][j])) && (fraction.isNonZero(matrix[i][j])) && (j < matrix[0].length)) {
                console.log("Row Replacement to row: " + (x+1));
                let product = fraction.multiplyFraction(matrix[i][j], matrix[x][j]);
                matrix = operations.rowReplacementOperation(matrix, i, x, fraction.negateFraction(product));
                printMatrix(matrix);
            }
        }

        reducedRowEchelon(matrix, i+1, j+1);
    }
}


 */