let calcOperand1,calcOperand2,calcOperation,calcResult;
let inputId=document.getElementById("calc-input");
let outputId=inputId;//document.getElementById("calc-output");
let operationPressed;
let isErrorRaised;

//executable code
initCalculator();


//function declarations
function initCalculator() {
    voidCalculation();
    operationPressed = false;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getOperand(operandNumber) {
    let inputNumber = parseFloat(inputId.value);

    if(!isNumeric(inputNumber)) {
        setCalculationErr();
        return;
    }

    if(operandNumber===1)calcOperand1 = inputNumber;
    else calcOperand2 =  inputNumber;
}

function clearInput() {
    inputId.value = "";
}

function voidCalculation() {
    calcOperand1 = null;
    calcOperand2 = null;
    calcOperation = "";
}

function setCalculationErr(){
    voidCalculation();
    operationPressed = false;
    inputId.value = "Error, press C";
    isErrorRaised = true;
}

function showResult() {
    if(isNumeric(calcResult))outputId.value=calcResult;
    else setCalculationErr();
}

function pressC() {
    voidCalculation();
    clearInput();
    operationPressed = false;
    isErrorRaised = false;
}

function pressEq() {
    if(isErrorRaised)return;
    getOperand(2);
    calculate();
    showResult();
    voidCalculation();
}

function pressChgSign() {
    if(isErrorRaised)return;
    if(inputId.value[0] !== "-") inputId.value = "-" + inputId.value;
    else inputId.value = inputId.value.slice(1);
}

function pressDot() {
    if(isErrorRaised)return;
    inputId.value += ".";
}

function pressNumber(number) {
    if(isErrorRaised)return;

    if(operationPressed){
        clearInput();
        operationPressed = false;
    }

    inputId.value += number.toString();
}

//UGEN: add button highlighting
function pressOperation(operation) {
    if(isErrorRaised)return;
    if(calcOperation!=="") pressEq();
    calcOperation = operation;
    getOperand(1);
    operationPressed = true;
}

function calculate() {
    let result;
    switch (calcOperation) {
        case "Multiply":
            result = calcOperand1*calcOperand2;
            break;
        case "Divide":
            result = calcOperand1/calcOperand2;
            break;
        case "Sum":
            result = calcOperand1+calcOperand2;
            break;
        case "Diff":
            result = calcOperand1-calcOperand2;
            break;
        case "Percent":
            result = (calcOperand1/100)*calcOperand2;
            break;
        default:
            result = NaN;
            break;
    }
    calcResult = result;
}

