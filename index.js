import matrixOperations from './matrixOperations.js';
import latexOutput from './latexOutput.js';

let matrix = [[3, 5, -6, 5, 7],[4, 3, -2, 5, 10],[7, -5, 2, 9, -1],[1, 4, 6, 7, 6]];
matrixOperations.convertInput(matrix);
matrixOperations.reducedRowEchelon(matrix, 0, 0);
latexOutput.matrixLatex(matrix);
