export class frac {
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}

	addFraction(num2) {
		let commonDenominator = this.den * num2.den;
		let newFrac = new frac((num2.num * this.den) + (this.num * num2.den),
								commonDenominator);

		return newFrac.simplifyFraction(newFrac);
	}

	subtractFraction(num2) {
		// Uses existing add function by negating second fraction
		let newFrac = num2.negateFraction();
		return this.addFraction(newFrac);
	}

	multiplyFraction(num2) {
		let newFrac = new frac((this.num * num2.num), (this.den * num2.den));

		return newFrac.simplifyFraction(newFrac);
	}

	divideFraction(num2) {
		let newFrac = new frac((this.num * num2.den), (this.den * num2.num));

		return newFrac.simplifyFraction(newFrac);
	}

	negateFraction() {
		return new frac((-1) * this.num, this.den);
	}

	getDecimal() {
		return this.num / this.den;
	}

	isEqualTo(num2) {
		return ((this.num == num2.num) && (this.den == num2.den));
		return ((this.num == num2.num) && (this.den == num2.den));
	}

	isNonZero() {
		return (this.num != 0);
	}

	invertFraction() {
		return new frac(this.den, this.num);
	}

	printFraction() {
		console.log(this.num + "/" + this.den);
	}

	simplifyFraction(oldFrac) {
		// Non-Permanant solution
		if ((oldFrac.num < 0) && (oldFrac.den < 0)) {
			oldFrac.num *= (-1);
			oldFrac.den *= (-1);
		}
		if ((oldFrac.den < 0) && (oldFrac.num >= 0)) {
			oldFrac.den *= (-1);
		}

		let divisor = Math.abs(gcd(oldFrac.num, oldFrac.den));
		if (divisor == 1) {
			return oldFrac;
		} 
		else {
			oldFrac.num /= divisor;
			oldFrac.den /= divisor;
		}

		return oldFrac;
	}
}

// Euclid's method

export function gcd(a, b) {
  if (!b) return a;

  return gcd(b, a % b);
}

export default {
	frac: frac,
	gcd: gcd
}