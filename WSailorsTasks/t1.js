let n = prompt("количество дней", 1);
const INTERNET_PRICE_PER_MONTH = 450;
const DAYS_IN_MONTH = 28;
let result = (INTERNET_PRICE_PER_MONTH/DAYS_IN_MONTH)*n;
let rounded_answer = result.toFixed(2);

console.log (rounded_answer) ;
alert(rounded_answer);
