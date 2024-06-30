let number = '5';
var digits = Number((String(number).split('.')[1] || []).length);

var num = Number(number) * (10 ** digits);
var den = 10 ** digits;

console.log(num);
console.log(den);