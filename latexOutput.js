import {frac} from './frac.js';
import * as fraction from './frac.js';
import matrixOperations from './matrixOperations.js';
import {complex} from './complex.js';
import * as comp from './complex.js';

function rowBasisLatex(matrix) {
	let output = `$\\left\\{\n`;

	// Traverse by row then column

	for (let x = 0; x < matrix.length; x++) {

		output = output.concat(`  \\begin{bmatrix}\n`);
		output = output.concat(`    `);

		for (let y = 0; y < matrix[0].length; y++) {
			
			// Include space after entries

			if (comp.hasReal(matrix[x][y]) && comp.hasComplex(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].re)) {
					output += `\\frac{${matrix[x][y].re.num}}{${matrix[x][y].re.den}} `;
				}
				else {
					output += `${matrix[x][y].re.num} `;
				}

				if (fraction.isFraction(matrix[x][y].im)) {
					output += `+ \\frac{${matrix[x][y].im.num}}{${matrix[x][y].im.den}}i `;
				}
				else {
					output += `+ ${matrix[x][y].im.num}i `;
				}
			}
			else if (comp.hasReal(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].re)) {
					output += `\\frac{${matrix[x][y].re.num}}{${matrix[x][y].re.den}} `;
				}
				else {
					output += `${matrix[x][y].re.num} `;
				}

			}
			else if (comp.hasComplex(matrix[x][y])) {
				if (fraction.isFraction(matrix[x][y].im)) {
					output += `\\frac{${matrix[x][y].im.num}}{${matrix[x][y].im.den}}i `;
				}
				else {
					output += `${matrix[x][y].im.num}i `;
				}
			}
			else {
				if (!comp.isNonZeroComplex(matrix[x][y])) {
					output += `0 `;
				}
			}

			if (y + 1 < matrix[0].length) {
				output = output.concat(`& `);
			}
		}

		if (x + 1 < matrix.length) {
			output = output.concat(`\\\\\n`);
			output = output.concat(`  \\end{bmatrix}_{\\textstyle,}\n`);
		}
		else {
			output = output.concat(`\n`);
			output = output.concat(`  \\end{bmatrix}\n`);
		}
	}

	output = output.concat(`\\right\\}$\n`);
	console.log(output);
}

function columnBasisLatex(matrix) {
	let output = `$\\left\\{\n`;

	// Traverse by column then row

	for (let x = 0; x < matrix[0].length; x++) {

		output = output.concat(`  \\begin{bmatrix}\n`);

		for (let y = 0; y < matrix.length; y++) {
			
			// Include space before entries
			output = output.concat(`    `);

			if (comp.hasReal(matrix[y][x]) && comp.hasComplex(matrix[y][x])) {
				if (fraction.isFraction(matrix[y][x].re)) {
					output += `\\frac{${matrix[y][x].re.num}}{${matrix[y][x].re.den}} `;
				}
				else {
					output += `${matrix[y][x].re.num} `;
				}

				if (fraction.isFraction(matrix[y][x].im)) {
					output += `+ \\frac{${matrix[y][x].im.num}}{${matrix[y][x].im.den}}i `;
				}
				else {
					output += `+ ${matrix[y][x].im.num}i `;
				}
			}
			else if (comp.hasReal(matrix[y][x])) {
				if (fraction.isFraction(matrix[y][x].re)) {
					output += `\\frac{${matrix[y][x].re.num}}{${matrix[y][x].re.den}} `;
				}
				else {
					output += `${matrix[y][x].re.num} `;
				}

			}
			else if (comp.hasComplex(matrix[y][x])) {
				if (fraction.isFraction(matrix[y][x].im)) {
					output += `\\frac{${matrix[y][x].im.num}}{${matrix[y][x].im.den}}i `;
				}
				else {
					output += `${matrix[y][x].im.num}i `;
				}
			}
			else {
				if (!comp.isNonZeroComplex(matrix[y][x])) {
					output += `0 `;
				}
			}

			if (y + 1 < matrix.length) {
				output = output.concat(`\\\\\n`);
			}
			else {
				output = output.concat(`\n`);
			}
		}

		if (x + 1 < matrix[0].length) {
			output = output.concat(`  \\end{bmatrix}_{\\textstyle,}\n`);
		}
		else {
			output = output.concat(`  \\end{bmatrix}\n`);
		}
	}

	output = output.concat(`\\right\\}$\n`);
	console.log(output);
}

export default {
	rowBasisLatex: rowBasisLatex,
	columnBasisLatex: columnBasisLatex
}