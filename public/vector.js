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
		if (comp.hasComplex(vector2[x])) {
			sum = comp.addComplex(sum, comp.multiplyComplex(vector1[x], comp.getConjugate(vector2[x])));
		}
		else {
			sum = comp.addComplex(sum, comp.multiplyComplex(vector1[x], vector2[x]));
		}
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
	console.log('\n\nTaking the scalar product: ');
	console.log(scalar);
	console.log(vector);

	for (let x = 0; x < vector.length; x++) {
		productArr.push(comp.multiplyComplex(vector[x], scalar));
	}

	console.log('After Scalar: ');
	console.log(productArr);

	return productArr;
}

/*
 * Add two vectors of similar but variable length.
 */

function addVector(vector1, vector2) {
	let newVector = [];

	console.log('\n\nAdding two vectors: ');
	console.log(vector1);
	console.log(vector2);

	for (let x = 0; x < vector1.length; x++) {
		newVector.push(comp.addComplex(vector1[x], vector2[x]));
	}

	console.log('After adding vectors:');
	console.log(newVector);

	return newVector;
}

/*
 * Subtracts vector2 from vector1 using addVector
 */

function subtractVector(vector1, vector2) {
	console.log('\n\nsubtracting vector 1 and 2: ');
	console.log(vector1);
	console.log(vector2);
	return addVector(vector1, negateVector(vector2));
}

/*
 * Returns projection of vector1 on vector2
 */

function projectVector(vector1, vector2) {
	console.log('\n\nProjecting Vector 1 onto two');
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

function negateVector(vector) {
	let newVector = [];
	console.log('\n\nNegating vector before: ');
	console.log(vector);
	for (let x = 0; x < vector.length; x++) {
		newVector.push(new complex(fraction.negateFraction(vector[x].re), fraction.negateFraction(vector[x].im)));
	}
	console.log('After negating vector: ');
	console.log(newVector);
	return newVector;
}

function isNonZeroVector(vector) {
	for (let x = 0; x < vector.length; x++) {
		if (comp.isNonZeroComplex(vector[x])) {
			return true;
		}
	}
	return false;
}

export default {
	innerProduct: innerProduct,
	scalarProduct: scalarProduct,
	addVector: addVector,
	subtractVector: subtractVector,
	projectVector: projectVector,
	simplifyVector: simplifyVector,
	isNonZeroVector: isNonZeroVector
}