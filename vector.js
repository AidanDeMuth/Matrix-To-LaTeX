import {frac, gcd} from './frac.js';

/*
 * Returns the Inner Product
 *
 * PARAMS - two single dimensional arrays of even size
 */

function innerProduct(vector_1, vector_2) {
	if (vector_1.length != vector_2.length) {
		console.log("Vectors must be same length!");
		return 0;
	}

	let sum = new frac(0, 1);

	for (let x = 0; x < vector_1.length; x++) {
		sum = sum.addFraction(vector_1[x].multiplyFraction(vector_2[x]));
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

export default {
	innerProduct: innerProduct,
	scalarProduct: scalarProduct
}