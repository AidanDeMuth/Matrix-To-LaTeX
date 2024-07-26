import {frac} from './frac.js';
import * as fraction from './frac.js';
import matrixOperations from './matrixOperations.js';
import {complex} from './complex.js';
import * as comp from './complex.js';

/*
 * Takes a complex number object as a parameter and gets the latex formatting for that additional number.
 * Moves negative signs outside of fractions, checks if numbers are fractions, and writes the imaginary number
 * i if necessary.
 * Adds a space at end of output.
 */

function getNumberFormat(number) {
	let format = ``;
	if (comp.hasReal(number) && comp.hasComplex(number)) {
		if (fraction.getDecimal(number.re) < 0) {
			if (fraction.isFraction(number.re)) {
				format += `-\\frac{${fraction.negateFraction(number.re).num}}{${number.re.den}} `;
			}
			else {
				format += `-${number.re.num} `;
			}
		}
		else {
			if (fraction.isFraction(number.re)) {
				format += `\\frac{${number.re.num}}{${number.re.den}} `;
			}
			else {
				format += `${number.re.num} `;
			}
		}

		if (fraction.getDecimal(number.im) < 0) {
			if (fraction.isFraction(number.im)) {
				format += `- \\frac{${fraction.negateFraction(number.im).num}}{${number.im.den}}i `;
			}
			else {
				format += `- ${fraction.negateFraction(number.im).num}i `;
			}
		}
		else {
			if (fraction.isFraction(number.im)) {
				format += `+ \\frac{${number.im.num}}{${number.im.den}}i `;
			}
			else {
				format += `+ ${number.im.num}i `;
			}
		}
	}
	else if (comp.hasReal(number)) {
		if (fraction.getDecimal(number.re) < 0) {
			if (fraction.isFraction(number.re)) {
				format += `-\\frac{${fraction.negateFraction(number.re).num}}{${number.re.den}} `;
			}
			else {
				format += `-${number.re.num} `;
			}
		}
		else {
			if (fraction.isFraction(number.re)) {
				format += `\\frac{${number.re.num}}{${number.re.den}} `;
			}
			else {
				format += `${number.re.num} `;
			}
		}
	}
	else if (comp.hasComplex(number)) {
		if (fraction.getDecimal(number.im) < 0) {
			if (fraction.isFraction(number.im)) {
				format += `-\\frac{${fraction.negateFraction(number.im).num}}{${number.im.den}}i `;
			}
			else {
				format += `-${number.im.num}i `;
			}
		}
		else {
			if (fraction.isFraction(number.im)) {
				format += `\\frac{${number.im.num}}{${number.im.den}}i `;
			}
			else {
				format += `${number.im.num}i `;
			}
		}
	}
	else {
		if (!comp.isNonZeroComplex(number)) {
			format += `0 `;
		}
	}

	return format;
}

/*
 * Prints a generic formatted matrix.
 */

export function matrixLatex(matrix, bracket) {
	let output = `$\\begin{${bracket}}\n`;

	// Traverse by row then column

	for (let x = 0; x < matrix.length; x++) {

		output = output.concat(`\t`);

		for (let y = 0; y < matrix[0].length; y++) {
			output = output.concat(getNumberFormat(matrix[x][y]));

			if (y + 1 < matrix[0].length) {
				output = output.concat(`& `);
			}
		}

		if (x + 1 < matrix.length) {
			output = output.concat(`\\\\\n`);
		}
		else {
			output = output.concat(`\n`);
		}
	}

	output = output.concat(`\\end{${bracket}}$\n`);
	return output;
}

/*
 * Prints a Latex formatted matrix where the basis vectors are 1xn matrices.
 */

export function rowBasisLatex(matrix, innerBracket, outerBracket) {
	let output = `$\\begin{${outerBracket}}\n`;

	// Traverse by row then column

	for (let x = 0; x < matrix.length; x++) {

		output = output.concat(`\t\\begin{${innerBracket}}\n`);
		output = output.concat(`\t\t`);

		for (let y = 0; y < matrix[0].length; y++) {
			output = output.concat(getNumberFormat(matrix[x][y]));

			if (y + 1 < matrix[0].length) {
				output = output.concat(`& `);
			}
		}

		if (x + 1 < matrix.length) {
			output = output.concat(`\\\\\n`);
			output = output.concat(`\t\\end{${innerBracket}}_{\\textstyle,}\n`);
		}
		else {
			output = output.concat(`\n`);
			output = output.concat(`\t\\end{${innerBracket}}\n`);
		}
	}

	output = output.concat(`\\end{${outerBracket}}$\n`);
	return output;
}

/*
 * Prints a Latex formatted matrix where the basis vectors are nx1 matrices.
 */

export function columnBasisLatex(matrix, innerBracket, outerBracket) {
	let output = `$\\begin{${outerBracket}}\n`;

	// Traverse by column then row

	for (let x = 0; x < matrix[0].length; x++) {

		output = output.concat(`\t\\begin{${innerBracket}}\n`);

		for (let y = 0; y < matrix.length; y++) {
			
			// Include space before entries
			output = output.concat(`\t\t`);

			output = output.concat(getNumberFormat(matrix[y][x]));

			if (y + 1 < matrix.length) {
				output = output.concat(`\\\\\n`);
			}
			else {
				output = output.concat(`\n`);
			}
		}

		if (x + 1 < matrix[0].length) {
			output = output.concat(`\t\\end{${innerBracket}}_{\\textstyle,} &\n`);
		}
		else {
			output = output.concat(`\t\\end{${innerBracket}}\n`);
		}
	}

	output = output.concat(`\\end{${outerBracket}}$\n`);
	return output;
}

export default {
	matrixLatex: matrixLatex,
	rowBasisLatex: rowBasisLatex,
	columnBasisLatex: columnBasisLatex
}