let calcOperand1,calcOperand2,calcOperation,calcResult;
let inputId=document.getElementById("calc-input");
let outputId=inputId;//document.getElementById("calc-output");

//executable code
initCalculator();


//function declarations
function initCalculator() {
    voidCalculation();
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getOperand1() {
    if(isNumeric(inputId.value)){
        calcOperand1 = Number(inputId.value);
        clearInput();
    }
    else setCalculationErr();

}

function getOperand2() {
    if(isNumeric(inputId.value)){
        calcOperand2 = Number(inputId.value);
        clearInput();
    }
    else setCalculationErr();
}

function clearInput() {
    inputId.value="";
}

function voidCalculation() {
    calcOperand1=null;
    calcOperand2=null;
    calcOperation="";
}

function setCalculationErr(){
    voidCalculation();
    inputId.value="Error, press C";
}

function showResult() {
    if(isNumeric(calcResult))outputId.value=calcResult;
    else setCalculationErr();
}

function pressC() {
    voidCalculation();
    clearInput();
}

function pressEq() {
    getOperand2();
    calculate();
    showResult();
    voidCalculation();
}

function pressChgSign() {
    if(inputId.value[0]!=="-")inputId.value = "-"+inputId.value;
    else inputId.value = inputId.value.slice(1);
}

function pressDot() {
    inputId.value+=".";
}

function press0() {
    inputId.value+="0";
}

function press1() {
    inputId.value+="1";
}

function press2() {
    inputId.value+="2";
}

function press3() {
    inputId.value+="3";
}

function press4() {
    inputId.value+="4";
}

function press5() {
    inputId.value+="5";
}

function press6() {
    inputId.value+="6";
}
function press7() {
    inputId.value+="7";
}

function press8() {
    inputId.value+="8";
}

function press9() {
    inputId.value+="9";
}

function pressMult() {
    if(calcOperation!=="")pressEq();
    calcOperation="Multiply";
    getOperand1();
}

function pressDiv() {
    if(calcOperation!=="")pressEq();
    calcOperation="Divide";
    getOperand1();
}

function pressSum() {
    if(calcOperation!=="")pressEq();
    calcOperation="Sum";
    getOperand1();
}

function pressDiff() {
    if(calcOperation!=="")pressEq();
    calcOperation="Diff";
    getOperand1();
}

function pressPercent() {
    if(calcOperation!=="")pressEq();
    calcOperation="Percent";
    getOperand1();
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
    calcResult=result;
    //return isNumeric(result);
}

