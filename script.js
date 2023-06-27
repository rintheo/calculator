let operandCurrent = '0';
let operandPrevious = '';
let operator = '';
let result = 0;
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

        if (operandCurrent === '0' || justOperated) {
            operandCurrent = keyInput;
            justOperated = false;
        }
        else {
            operandCurrent += keyInput;
        }
    }
    else if (keyCode === 'NumpadDecimal') {
        if (operandCurrent === '' || justOperated) {
            operandCurrent = '0.';
            justOperated = false;
        }
        else if (!operandCurrent.toString().includes('.')) {
            operandCurrent += keyInput;
        }
    }
    else if (buttonOperators.includes(keyCode)) {
        if (operandPrevious && operandCurrent) {
            operation();
        }

        if (keyCode !== 'NumpadEnter') {
            if (operandCurrent) {
                operandPrevious = operandCurrent;
                operandCurrent = '';
            }
            operator = keyInput;
        }
    }
    else if (keyCode === 'Delete') {
        allClear();
    }
    else if (keyCode === 'Backspace') {
        backspace();
    }

    screenBottom.textContent = `${operandPrevious}${operator}${operandCurrent}`;                

    console.log(`operandCurrent:  ${typeof operandCurrent} '${operandCurrent}'`); // For debugging
    console.log(`operator:        ${typeof operator} '${operator}'`); // For debugging
    console.log(`operandPrevious: ${typeof operandPrevious} '${operandPrevious}'`); // For debugging
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operation() {
    screenTop.classList.remove('hidden');
    screenTop.textContent = screenBottom.textContent;
    switch (operator) {
        case '+':
            operandCurrent = exponential(round(add(operandPrevious, operandCurrent)));
            break;
        case '-':
            operandCurrent = exponential(round(subtract(operandPrevious, operandCurrent)));
            break;
        case '*':
            operandCurrent = exponential(round(multiply(operandPrevious, operandCurrent)));
            break;
        case '/':
            operandCurrent = exponential(round(divide(operandPrevious, operandCurrent)));
            break;
    }
    operandPrevious = '';
    operator = '';
    justOperated = true;
}

function round(num) {
    if ((num.toString().split('.')[0].length) < 17) {
        const multiplier = 10 ** (17 - 1 - num.toString().split('.')[0].length);
        return Math.round(num * multiplier) / multiplier;
    }
    return num;
}

function exponential(num) {
    return (num > 1e16) ? num.toExponential(11): num;
}

function allClear() {
    operandCurrent = '0';
    operandPrevious = '';
    operator = '';    
    screenTop.classList.add('hidden');
}

function backspace() {
    if (operandCurrent && !justOperated) {
        operandCurrent = operandCurrent.slice(0, operandCurrent.toString().length - 1);
    }
}