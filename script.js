let operandCurrent = '0';
let operandPrevious = '';
let operator = '';
let justOperated = false;
let isLocked =  false;

const screenTop = document.querySelector('#screenTop');
const screenBottom = document.querySelector('#screenBottom');
const buttons = document.querySelectorAll('.button');
const currentYear = document.querySelector('#currentYear')

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
    'NumpadEnter',
];

const buttonAll = [
    ...buttonNumbers,
    ...buttonOperators,
    'NumpadDecimal',
    'Backspace',
    'Delete',
]

function initializeButtons() {
    window.addEventListener('keydown', clickButton);
    buttons.forEach((button) => {
        button.addEventListener('click', clickButton);
    });
    if (isLocked) unlockCalculator();
}

function clickButton(e) {
    console.clear(); // For debugging

    if (e.type === 'keydown' && !buttonAll.includes(e.code)) {
        return;
    }  
    else {
        e.preventDefault();
    }
        
    const keyCode = (e.type === 'click') ?
                     this.getAttribute("data-code") :
                     e.code;
    const keyInput = (e.type === 'click') ?
                      this.getAttribute("data-input") :
                      e.key ;

    if ((!isLocked) || (isLocked && keyCode === 'Delete')) {
        processInput(keyCode, keyInput);
    }
}

function processInput(keyCode, keyInput) {
    if (buttonNumbers.includes(keyCode)) {
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
            operate();
        }

        if (keyCode !== 'NumpadEnter') {
            switchOperands()
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

function backspace() {
    if (operandCurrent.toString().length <= 1 && !operandPrevious && !operator) {
        operandCurrent = '0';
    }
    else if (operandCurrent) {
        operandCurrent = operandCurrent.toString().slice(0, operandCurrent.toString().length - 1);
    }
    else if (!operandCurrent && operator) {
        operator = '';
        switchOperands()
    }
}

function switchOperands() {
    if (operandCurrent) {
        operandPrevious = operandCurrent;
        operandCurrent = '';
    }
    else if (!operator){
        operandCurrent = operandPrevious;
        operandPrevious = '';
    }
}

function allClear() {
    operandCurrent = '0';
    operandPrevious = '';
    operator = '';    
    screenTop.classList.add('hidden');
    initializeButtons()
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

function operate() {
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
    checkValid(operandCurrent);
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

function checkValid(num) {
    if (!isFinite(num)) {
        operandCurrent = 'Math ERROR';
        lockCalculator();
    }
}

function lockCalculator() {
    buttons.forEach((button) => {
        if (button.getAttribute('data-code') !== 'Delete') {
            button.classList.add('locked');   
        }
    });
    isLocked = true;
}

function unlockCalculator() {
    buttons.forEach((button) => {
        button.classList.remove('locked');
    });
    isLocked = false;
}

currentYear.textContent = new Date().getFullYear();
initializeButtons()