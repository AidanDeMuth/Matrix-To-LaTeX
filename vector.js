import {frac, gcd} from './frac.js';

/*
 * Returns the Inner Product
 *
 * PARAMS - two single dimensional arrays of even size
 */

function innerProduct(vector1, vector2) {
	let sum = new frac(0, 1);

	for (let x = 0; x < vector1.length; x++) {
		sum = sum.addFraction(vector1[x].multiplyFraction(vector2[x]));
	}

	sum.simplifyFraction(sum);

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
		productArr.push(vector[x].multiplyFraction(scalarFrac));
		productArr[x].simplifyFraction(productArr[x]);
	}

	return productArr;
}

/*
 * Add two vectors of similar but variable length.
 */

function addVector(vector1, vector2) {
	let newVector = [];

	for (let x = 0; x < vector1.length; x++) {
		newVector.push(vector1[x].addFraction(vector2[x]));
		newVector[x].simplifyFraction(newVector[x]);
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
	return scalarProduct(innerProduct(vector1, vector2).divideFraction(innerProduct(vector2, vector2)), vector2);
}

/*
 * Simplifies an entire vector
 */

function simplifyVector(vector) {
	for (let x = 0; x < vector.length; x++) {
		vector[x] = vector[x].simplifyFraction(vector[x]);
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