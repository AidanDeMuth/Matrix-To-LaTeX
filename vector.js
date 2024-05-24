import {frac} from './frac.js';
import * as fraction from './frac.js';
import {complex} from './complex.js';
import * as comp from './complex.js';

/*
 * Returns the Inner Product
 *
 * PARAMS - two single dimensional arrays of even size
 */

function innerProduct(vector1, vector2) {
	let sum = new complex(new frac(0, 1), new frac(0, 1));

	for (let x = 0; x < vector1.length; x++) {
		sum = comp.addComplex(sum, comp.multiplyComplex(vector1[x], vector2[x]));
	}

	return sum;
}

/*
 * Returns a 1D array of a vector multiplied by frac
 *
 * PARAMS - frac object, 1D array
 */

function scalarProduct(scalar, vector) {
	let productArr = [];

	for (let x = 0; x < vector.length; x++) {
		productArr.push(comp.multiplyComplex(vector[x], scalar));
	}

	return productArr;
}

/*
 * Add two vectors of similar but variable length.
 */

function addVector(vector1, vector2) {
	let newVector = [];

	for (let x = 0; x < vector1.length; x++) {
		newVector.push(comp.addComplex(vector1[x], vector2[x]));
	}

	return newVector;
}

/*
 * Subtracts vector2 from vector1 using addVector
 */

function subtractVector(vector1, vector2) {
	return addVector(vector1, scalarProduct(new complex(new frac(-1, 1), new frac(-1, 1)), vector2));
}

/*
 * Returns projection of vector1 on vector2
 */

function projectVector(vector1, vector2) {
	console.log(vector1);
	console.log(vector2);
	return scalarProduct(comp.divideComplex(innerProduct(vector1, vector2), innerProduct(vector2, vector2)), vector2);
}

/*
 * Simplifies an entire vector
 */

function simplifyVector(vector) {
	for (let x = 0; x < vector.length; x++) {
		comp.simplifyComplex(vector[x]);
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