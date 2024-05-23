import {frac} from './frac.js';
import * as fraction from './frac.js';

/*
 * Returns the Inner Product
 *
 * PARAMS - two single dimensional arrays of even size
 */

function innerProduct(vector1, vector2) {
	let sum = new frac(0, 1);

	for (let x = 0; x < vector1.length; x++) {
		sum = fraction.addFraction(sum, fraction.multiplyFraction(vector1[x], vector2[x]));
	}

	fraction.simplifyFraction(sum);

	return sum;
}

/*
 * Returns a 1D array of a vector multiplied by frac
 *
 * PARAMS - frac object, 1D array
 */

function scalarProduct(scalarFrac, vector) {
	let productArr = [];

	for (let x = 0; x < vector.length; x++) {
		productArr.push(fraction.multiplyFraction(vector[x], scalarFrac));
		fraction.simplifyFraction(productArr[x]);
	}

	return productArr;
}

/*
 * Add two vectors of similar but variable length.
 */

function addVector(vector1, vector2) {
	let newVector = [];

	for (let x = 0; x < vector1.length; x++) {
		newVector.push(fraction.addFraction(vector1[x], vector2[x]));
		fraction.simplifyFraction(newVector[x]);
	}

	return newVector;
}

/*
 * Subtracts vector2 from vector1 using addVector
 */

function subtractVector(vector1, vector2) {
	return addVector(vector1, scalarProduct(new frac(-1, 1), vector2));
}

/*
 * Returns projection of vector1 on vector2
 */

function projectVector(vector1, vector2) {
	return scalarProduct(fraction.divideFraction(innerProduct(vector1, vector2), innerProduct(vector2, vector2)), vector2);
}

/*
 * Simplifies an entire vector
 */

function simplifyVector(vector) {
	for (let x = 0; x < vector.length; x++) {
		fraction.simplifyFraction(vector[x]);
	}
}

export default {
	innerProduct: innerProduct,
	scalarProduct: scalarProduct,
	addVector: addVector,
	subtractVector: subtractVector,
	projectVector: projectVector,
	simplifyVector: simplifyVector
}