let operandCurrent = 0;
let operandPrevious = '0';
let operator = '';
let result = 0;
let isOperatorPressed = false;
let isOperatorActive = false;

const screenTop = document.querySelector('#screenTop');
const screenBottom = document.querySelector('#screenBottom');
const buttons = document.querySelectorAll('.button');

const buttonNumbers = [
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'Numpad0',
];

const buttonOperators = ['NumpadAdd', 'NumpadSubtract', 'NumpadMultiply', 'NumpadDivide'];


buttons.forEach((button) => {
    button.addEventListener('click', clickButton);
});

function clickButton(e) {
    const keyCode = this.getAttribute("data-code");
    const keyInput = this.getAttribute("data-input");

    console.clear(); // For debugging
    console.log(`keyInput = ${keyInput}, ${typeof keyInput}`); // For debugging
 
    if (buttonNumbers.includes(keyCode)) {
        console.log('Condition 1 was fired.'); // For debugging
        if (isOperatorActive) {
            isOperatorActive = false;
            operandPrevious = operandCurrent;
            operandCurrent = '';
        }
        if (operandCurrent == 0) {
            operandCurrent = keyInput;
        }
        else {
            operandCurrent += keyInput;
        }

        if (!isOperatorPressed) {
            screenBottom.textContent = operandCurrent;                
        }
        else {
            screenBottom.textContent = `${operandPrevious}${operator}${operandCurrent}`;                
        }
    }
    else if (buttonOperators.includes(keyCode)) {
        console.log('Condition for operators was fired.'); // For debugging
        isOperatorPressed = true; 
        isOperatorActive = true;
        operator = keyInput;
        screenBottom.textContent = `${operandCurrent}${operator}`;
    }

    console.log(`operandCurrent: ${operandCurrent}`); // For debugging
    console.log(`operator: ${operator}`); // For debugging
    console.log(`operandPrevious: ${operandPrevious}`); // For debugging
}