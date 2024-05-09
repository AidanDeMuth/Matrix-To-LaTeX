import {frac, gcd} from './frac.js';
import matrixOperations from './matrixOperations.js';

/*
 * Given a matrix, will product latex code with brackets (\bmatrix)
 */

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
		if (x + 1 < matrix.length) {
			line = line.concat(`\\\\`);
		}
		line = line.concat(`\n`);
		output = output.concat(line);
	}

	output = output.concat(`\\end{bmatrix}$\n`)
	console.log(output);
}

/*
 * Given a matrix, will produce the latex code as if it were a basis. Braces will surround
 * vectors, and each vector will be represented as a matrix.
 */

function columnBasisLatex(matrix) {
	console.log("PRINTING MATRIX");
	console.log(matrix);

	let output = `$\\left\\{\n`;
	for (let x = 0; x < matrix[0].length; x++) {
		output = output.concat(`  \\begin{bmatrix}\n`);

		for (let y = 0; y < matrix.length; y++) {
			if (matrix[y][x].isFraction()) {
				console.log("is fraction");
				output = output.concat(`   \\frac{${matrix[y][x].num}}{${matrix[y][x].den}} \\\\\n`);
			}
			else {
				console.log("is not fraction");
				output = output.concat(`   ${matrix[y][x].num} \\\\\n`);
			}
		}
		output = output.concat(`  \\end{bmatrix}`)
		if (x + 1 < matrix[0].length) {
			output = output.concat(`_{\\textstyle,}`)
		}
		output = output.concat(`\n`);
	}
	output = output.concat(`\\right\\}$\n`);

	console.log(output);
}

function rowBasisLatex(matrix) {
	console.log("Printing Matrix");
	console.log(matrix);

	let output = `$\\left\\{\n`;

	for (let x = 0; x < matrix.length; x++) {
		output = output.concat(`  \\begin{bmatrix}\n  `);
		output = output.concat(`  `);
		for (let y = 0; y < matrix[0].length; y++) {
			if (matrix[y][x].isFraction()) {
				console.log("is fraction");
				output = output.concat(`  \\frac{${matrix[y][x].num}}{${matrix[y][x].den}} & `);
			}
			else {
				console.log("is not fraction");
				output = output.concat(`${matrix[y][x].num} & `);
			}
		}
		output = output.concat(`\\\\\n`);
		output = output.concat(`  \\end{bmatrix}\n`);
		if (x + 1 < matrix.length) {
			output = output.concat(`  _{\\textstyle,}\n`);
		}
	}

	output = output.concat(`\\right\\}$\n`);
	console.log(output);
}

export default {
	matrixLatex: matrixLatex,
	columnBasisLatex: columnBasisLatex,
	rowBasisLatex: rowBasisLatex
}