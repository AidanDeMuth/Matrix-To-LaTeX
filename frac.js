export class frac {
	constructor(num, den) {
		this.num = num;
		this.den = den;
	}

	addFraction(num2) {
		let commonDenominator = this.den * num2.den;
		let newFrac = new frac((num2.num * this.den) + (this.num * num2.den),
								commonDenominator);

		// If GCD > 1 it divides, if GCD == 1 it returns

		let divisor = Math.abs(gcd(newFrac.num, newFrac.den));
		if (divisor == 1) {
			return newFrac;
		} 
		else {
			newFrac.num /= divisor;
			newFrac.den /= divisor;
		}

		// Non-Permanant solution
		if ((newFrac.num < 0) && (newFrac.den < 0)) {
			newFrac.num *= (-1);
			newFrac.den *= (-1);
		}
		if ((newFrac.den == -1) && (newFrac.num == 0)) {
			newFrac.den *= (-1);
		}

		return newFrac;
	}

	subtractFraction(num2) {
		// Uses existing add function by negating second fraction
		let newFrac = num2.negateFraction();
		return this.addFraction(newFrac);
	}

	multiplyFraction(num2) {
		let newFrac = new frac((this.num * num2.num), (this.den * num2.den));

		// If GCD > 1 it divides, if GCD == 1 it returns

		let divisor = Math.abs(gcd(newFrac.num, newFrac.den));
		if (divisor == 1) {
			return newFrac;
		} 
		else {
			newFrac.num /= divisor;
			newFrac.den /= divisor;
		}

		// Non-Permanant solution
		if ((newFrac.num < 0) && (newFrac.den < 0)) {
			newFrac.num *= (-1);
			newFrac.den *= (-1);
		}
		if ((newFrac.den == -1) && (newFrac.num == 0)) {
			newFrac.den *= (-1);
		}

		return newFrac;
	}

	divideFraction(num2) {
		let newFrac = new frac((this.num * num2.den), (this.den * num2.num));

		// If GCD > 1 it divides, if GCD == 1 it returns

		let divisor = Math.abs(gcd(newFrac.num, newFrac.den));
		if (divisor == 1) {
			return newFrac;
		} 
		else {
			newFrac.num /= divisor;
			newFrac.den /= divisor;
		}

		// Non-Permanant solution
		if ((newFrac.num < 0) && (newFrac.den < 0)) {
			newFrac.num *= (-1);
			newFrac.den *= (-1);
		}
		if ((newFrac.den == -1) && (newFrac.num == 0)) {
			newFrac.den *= (-1);
		}

		return newFrac;
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
}

// Euclid's method, from Wikipedia

export function gcd(a, b) {
  if (!b) return a;

  return gcd(b, a % b);
}

export default {
	frac: frac,
	gcd: gcd
}