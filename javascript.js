//  Comment: operatorArray.length === 0 is when 
// you have not entered a number to add yet, 
// operatorArray.length === 1 is when you got the result
// of an operation, 
// operatorArray.length === 2 is when you have one
//  number and an operation but no second integer yet.

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const numberButtons = document.querySelectorAll('.number');
const basicOperationButtons = document.querySelectorAll('.basicOperation');
const allButtons = document.querySelectorAll('button');
const equalsButton = document.getElementById('equals')
let operatorArray = []; // empty array to store first number, operator and second array
let displayNumber = "0";
let justOperated = false;
let percentButton = document.getElementById('percent')
let noValuePutAfterFirstOperationButton = false // exists to make one number add/subtract/divide/multiply to itself if you press equals after pressing an operation w/o typing anything else
function handleClick(event) {
    let clickedItemId = event.target.id;
    console.log(clickedItemId);
    return clickedItemId;
};
const operatorsConverterFromString = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide
};

// below function exists to convert a number to a 9-digit item
const numberSlicer = (number) => {
    const numberString = number.toString();
    const slicedNumber = numberString.slice(0,9);
    const fixedNumber = Number(slicedNumber);
    return fixedNumber
};

const overflowCheck = (n) => {
    const integer = Number(n);
    if (integer > 999999999 || (integer < 0.00000001 && n >=0) || integer < -999999999 || (integer < 0 && integer > 0.00000001)) {
        return true;
    } else {
        return false;
    }
}



function updateDisplay() {
    display.textContent = displayNumber
};

const operate = (a, b, operator) => {
    let calculationResult = operatorsConverterFromString[operator](a,b);
    let calculationResultRounded = parseFloat(calculationResult.toFixed(9));
    let calculationResultFixed = numberSlicer(calculationResultRounded);
    justOperated = true;
    return calculationResultFixed;
};


numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        var buttonNumber = handleClick(event);
        const getDisplayNumber = displayNumber;
        const containsDecimal = displayNumber.toString().includes(".")
        if (displayNumber.length == 9) {
            noValuePutAfterFirstOperationButton = false;
            return alert("Digit length of 9 reached!");
        } else if (containsDecimal === true && buttonNumber ===".") {
            noValuePutAfterFirstOperationButton = false;
            return alert("Already put a decimal, can't put another one!");
        } else {
            (((displayNumber == "0" || noValuePutAfterFirstOperationButton === true ) ? (displayNumber = buttonNumber) : (displayNumber = getDisplayNumber + buttonNumber)))
            noValuePutAfterFirstOperationButton = false;
            if (operatorArray.length === 1) {
                justOperated = false;
                operatorArray.length = 0;
                displayNumber = buttonNumber;
                //reset if you have a sum then start typing a number without doing another operation
            } else if (operatorArray.length === 2 && justOperated === true) {
                justOperated = false 
                displayNumber = buttonNumber
                // condition if the result is just a first number in a new calculation with your operation already in the array
            }};
        updateDisplay()
    });
});

clearButton.addEventListener('click', () => {
    operatorArray.length = 0;
    displayNumber = "0";
    justOperated = false;
    updateDisplay();
});

basicOperationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        var basicOperation = handleClick(event);
        if (operatorArray.length === 0) {
            justOperated = false
            operatorArray.push(parseFloat(displayNumber));
            operatorArray.push(basicOperation);
            noValuePutAfterFirstOperationButton = true;
            console.log(noValuePutAfterFirstOperationButton);
            updateDisplay();
        } else if (operatorArray.length === 1) {
            justOperated = false
            operatorArray.push(basicOperation);
            noValuePutAfterFirstOperationButton = true;
        } else if (operatorArray.length === 2) {
            noValuePutAfterFirstOperationButton = false;
            justOperated = false
            operatorArray.push(parseFloat(displayNumber));
            let operatorResult = operate(operatorArray[0], operatorArray[2], operatorArray[1]);
            operatorArray.length = 0;
            if (overflowCheck(operatorResult) === true ) {
                justOperated = false
                displayNumber = "0"
                return alert("Overflow Error!")
            } else {
                operatorArray.push(operatorResult);
                operatorArray.push(basicOperation);
                displayNumber = operatorResult;
            }
            updateDisplay();
        }
    });
});

equalsButton.addEventListener('click', () => {

    let operatorResult
    noValuePutAfterFirstOperationButton = false;

    if (operatorArray.length === 0 || operatorArray.length === 1) {
        operatorArray.length = 0;
        operatorArray.push(parseFloat(displayNumber));
    } else if (operatorArray.length === 2 && noValuePutAfterFirstOperationButton === true) {
        let operatorResult = operate(operatorArray[0], operatorArray[0], operatorArray[1]);
        operatorArray.length = 0;
        if (overflowCheck(operatorResult) === true ) {
            justOperated = false
            displayNumber = "0"
            return alert("Overflow Error!")
        } else {
            operatorArray.push(operatorResult);
            displayNumber = operatorResult;
        }
    } else if (operatorArray.length === 2 && noValuePutAfterFirstOperationButton === false) {
        operatorArray.push(parseFloat(displayNumber));
        operatorResult = operate(operatorArray[0], operatorArray[2], operatorArray[1]);
        operatorArray.length = 0;
        if (overflowCheck(operatorResult) === true ) {
            justOperated = false
            displayNumber = "0"
            return alert("Overflow Error!")
        } else {
            operatorArray.push(operatorResult);
            displayNumber = operatorResult;
        }
    }
    updateDisplay();
});

percentButton.addEventListener('click', () => {
    let numberToPercent = parseFloat(displayNumber);
    let percentedNumber = operate(numberToPercent, 100, 'divide');
    let percentedNumberButString = percentedNumber.toString();
    justOperated = false;
    noValuePutAfterFirstOperationButton = false;
    if (overflowCheck(percentedNumber) === true) {
        operatorArray.length = 0;
        displayNumber = "0";
        updateDisplay();
        return alert("Overflow Error!");
    } else {
        updateDisplay();
        displayNumber = percentedNumberButString;
    }
    updateDisplay();
})


allButtons.forEach(button =>
    button.addEventListener('click', () => { 
        console.log(displayNumber);
        console.log(operatorArray);
        console.log(justOperated);
        console.log(noValuePutAfterFirstOperationButton);
    }));


