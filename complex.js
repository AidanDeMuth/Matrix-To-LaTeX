export class complex {
	constructor(re, im) {
		this.re = re;
		this.im = im;
	}
}

export function addComplex(num1, num2) {
	return new complex(num1.re + num2.re, num1.im + num2.im);
}

// Takes num2 away from num1

export function subtractComplex(num1, num2) {
	return addComplex(num1, negateComplex(num2));
}

export function negateComplex(num) {
	return new complex(num.re * (-1), num.im * (-1));
}

export default {
	complex: complex,
	addComplex: addComplex,
	subtractComplex: subtractComplex,
	negateComplex: negateComplex
}