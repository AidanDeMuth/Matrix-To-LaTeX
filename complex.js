import {addFraction, divideFraction, frac, multiplyFraction, negateFraction, subtractFraction} from './frac.js';
import * as fraction from './frac.js';

export class complex {
	constructor(re, im) {
		this.re = re;
		this.im = im;
	}
}

export function addComplex(num1, num2) {
	return new complex(addFraction(num1.re, num2.re), addFraction(num1.im, num2.im));
}

// Takes num2 away from num1

export function subtractComplex(num1, num2) {
	return addComplex(num1, negateComplex(num2));
}

export function negateComplex(num) {
	return new complex(negateFraction(num.re), negateFraction(num.im));
}

export function multiplyComplex(num1, num2) {
	return new complex(subtractFraction(multiplyFraction(num1.re, num2.re), multiplyFraction(num1.im, num2.im)),
				       addFraction(multiplyFraction(num1.re, num2.im), multiplyFraction(num1.im, num2.re)));
}

export function invertComplex(num) {
	let magnitude = addFraction(multiplyFraction(num.re, num.re), multiplyFraction(num.im, num.im));
	console.log(magnitude);
	return new complex(divideFraction(num.re, magnitude), negateFraction(divideFraction(num.im, magnitude)));
}

// Divides num1 by num2

export function divideComplex(num1, num2) {
	return multiplyComplex(num1, invertComplex())
}

export function isNonZeroComplex(num) {
	return (fraction.isNonZero(num.re) && fraction.isNonZero(num.im));
}

export default {
	complex: complex,
	addComplex: addComplex,
	subtractComplex: subtractComplex,
	negateComplex: negateComplex,
	multiplyComplex: multiplyComplex,
	invertComplex: invertComplex,
	dividecomplex: divideComplex,
	isNonZeroComplex: isNonZeroComplex
}