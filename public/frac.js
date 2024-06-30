export class frac {
    constructor(num, den) {
        this.num = num;
        this.den = den;
    }
}

export function addFraction(fraction1, fraction2) {
    let newFrac = new frac((fraction2.num * fraction1.den) + (fraction1.num * fraction2.den),
        fraction1.den * fraction2.den);
    return simplifyFraction(newFrac);
}

export function negateFraction(fraction1) {
    return new frac((-1) * fraction1.num, fraction1.den);
}

// Takes fraction2 away from fraction1

export function subtractFraction(fraction1, fraction2) {
    return addFraction(fraction1, negateFraction(fraction2));
}

export function multiplyFraction(fraction1, fraction2) {
    let newFrac = new frac((fraction1.num * fraction2.num), (fraction1.den * fraction2.den));
    return simplifyFraction(newFrac);
}

// Divides fraction1 by fraction2

export function divideFraction(fraction1, fraction2) {
    return simplifyFraction(new frac((fraction1.num * fraction2.den), (fraction1.den * fraction2.num)));
}

export function getDecimal(fraction1) {
    return fraction1.num / fraction1.den;
}

export function isEqualTo(fraction1, fraction2) {
    return ((fraction1.num === fraction2.num) && (fraction1.den === fraction2.den));
}

export function isNonZero(fraction1) {
    return fraction1.num !== 0;
}

// AKA reciprocal

export function invertFraction(fraction1) {
    return new frac(fraction1.den, fraction1.num);
}

export function printFraction(fraction1){
    console.log(fraction1.num + "/" + fraction1.den);
}

export function isFraction(fraction1) {
    return fraction1.den !== 1;
}

/*
 * Simplifies double negatives and GCD's
 */

export function simplifyFraction(fraction1) {
    if ((fraction1.num < 0) && (fraction1.den < 0)) {
        fraction1.num *= (-1);
        fraction1.den *= (-1);
    }
    if ((fraction1.den < 0) && (fraction1.num >= 0)) {
        fraction1.den *= (-1);
        fraction1.num *= (-1);
    }

    let divisor = Math.abs(gcd(fraction1.num, fraction1.den)); // divide by zero error maybe?
    if (divisor === 1) {
        return fraction1;
    } else {
        fraction1.num /= divisor;
        fraction1.den /= divisor;
    }
    return fraction1;
}

// Euclidean Algorithm

export function gcd(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, a % b);
}

/*
 * Expects a string (or number?) in the form '%.%'
 */

export function decimalToFraction(decimal) {
    // Takes the right side of the decimal, or an empty array if needed
    console.log('ínside fractin');

    var digits = (String(num).split('.')[1] || []).length;

    console.log('ínside fractin');
    // Scale both numbers above zero
    var num = Number(decimal) * (10 ** digits);
    var den = 10 ** digits;

    return simplifyFraction(new frac(num, den));
}

/*
 * Expects a string in the form of '%/%'
 */

export function stringToFraction(string) {
    let components = string.split('/');
    return simplifyFraction(new frac(components[0], components[1]));
}

export default {
    frac: frac,
    addFraction: addFraction,
    negateFraction: negateFraction,
    subtractFraction: subtractFraction,
    multiplyFraction: multiplyFraction,
    divideFraction: divideFraction,
    getDecimal: getDecimal,
    isEqualTo: isEqualTo,
    isNonZero: isNonZero,
    invertFraction: invertFraction,
    printFraction: printFraction,
    isFraction: isFraction,
    simplifyFraction: simplifyFraction,
    gcd: gcd,
    decimalToFraction: decimalToFraction,
    stringToFraction: stringToFraction
}