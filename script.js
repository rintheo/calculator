let operandCurrent = 0;
let operandPrevious = '';
let operator = '';
let result = 0;
let isOperatorActive = false;
let justOperated = false;

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

const buttonOperators = [
    'NumpadAdd', 
    'NumpadSubtract', 
    'NumpadMultiply', 
    'NumpadDivide',
    'NumpadEnter'
];


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

        if (operandCurrent == 0 || justOperated) {
            operandCurrent = keyInput;
            justOperated = false;
        }
        else {
            operandCurrent += keyInput;
        }

        screenBottom.textContent = `${operandPrevious}${operator}${operandCurrent}`;                

    }
    else if (buttonOperators.includes(keyCode)) {
        console.log('Condition for operators was fired.'); // For debugging
        if (operandPrevious) {
            screenTop.classList.remove('hidden');
            screenTop.textContent = screenBottom.textContent;
            switch (operator) {
                case '+':
                    operandCurrent = add(operandPrevious, operandCurrent);
                    break;
                case '-':
                    operandCurrent = subtract(operandPrevious, operandCurrent);
                    break;
                case '*':
                    operandCurrent = multiply(operandPrevious, operandCurrent);
                    break;
                case '/':
                    operandCurrent = divide(operandPrevious, operandCurrent);
                    break;
            }
            operandPrevious = '';
            operator = '';
            justOperated = true;
        }
        if (keyCode !== 'NumpadEnter') {
            isOperatorActive = true;
            operator = keyInput;
        }
        screenBottom.textContent = `${operandCurrent}${operator}`;
    }
    console.log(`operandCurrent:  ${operandCurrent}`); // For debugging
    console.log(`operator:        ${operator}`); // For debugging
    console.log(`operandPrevious: ${operandPrevious}`); // For debugging
}

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
}