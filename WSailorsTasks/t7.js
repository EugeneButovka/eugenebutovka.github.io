let obj = {"prop1":1, "prop2":"str1 gg", "prop3":2, "prop4":2, "prop5":"str2"};
let result=sumAndMultNumberProps(obj);
console.log("Результат: ", result);
alert(result);


function sumAndMultNumberProps(obj) {
    let sumOfMultNumbers=0;
    for (let prop in obj)
    {
        sumOfMultNumbers+=(isNumeric(obj[prop])?obj[prop]:0)*2;
    }
    return sumOfMultNumbers;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
