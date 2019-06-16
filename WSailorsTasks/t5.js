let  inputStr= prompt("введите номер автомобиля", "B234TE161");


function isValidCarNumber(carNumber){
    let strCarNumber = String(carNumber).toUpperCase().replace(/\s/g,'');
    let carNumRegex = /^([АВЕКМНОРСТУХ]|[ABEKMHOPCTYX])\d{3}([АВЕКМНОРСТУХ]|[ABEKMHOPCTYX]){2}\d{2,3}$/;

    let result = carNumRegex.test(strCarNumber);

    return result;
}

let funcOut=isValidCarNumber(inputStr);
alert(funcOut);
console.log(funcOut);

