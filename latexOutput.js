import {frac, gcd} from './frac.js';
import matrixOperations from './matrixOperations.js';

function matrixLatex(matrix) {
	matrixOperations.printMatrix(matrix);
	let output = `$\\begin{bmatrix}\n`;

	for (let x = 0; x < matrix.length; x++) {
		let line = `  `;
		for (let y = 0; y < matrix[0].length; y++) {

			// Fractions need to be formatted differently

			if (matrix[x][y].isFraction()) {
				console.log("is fraction");
				line = line.concat(` \\frac{${matrix[x][y].num}}{${matrix[x][y].den}} `);
			}
			else {
				console.log("is not fraction");
				line = line.concat(` ${matrix[x][y].num} `);
			}

			// No alignment formatter for the end of the line

			if (y + 1 < matrix[0].length) {
				line = line.concat(`&`);
			}
		}
		line = line.concat(`\\\\\n`);
		output = output.concat(line);
	}

	output = output.concat(`\\end{bmatrix}$\n`)
	console.log(output);
}

export default {
	matrixLatex: matrixLatex
}