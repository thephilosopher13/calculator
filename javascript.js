const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const display = document.getElementById('display')
const numberButtons = document.querySelectorAll('.number')
let displayNumber = "0";
function handleClick(event) {
    const clickedItemId = event.target.id;
    return clickedItemId
}

function updateDisplay() {
    display.textContent = displayNumber
}

const operate = (a,b,event) => {
    const operator = event.target.id;
    return ([operator](a,b))
}

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        var buttonNumber = handleClick(event);
        const getDisplayNumber = displayNumber;
        ((displayNumber == "0" ? (displayNumber = buttonNumber) : (displayNumber = getDisplayNumber + buttonNumber)))
        updateDisplay()
        console.log(displayNumber);
    });
});