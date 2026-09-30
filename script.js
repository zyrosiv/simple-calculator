let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = '';
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousValue === '') return;

    if (currentInput === '' && op === '.') return;

    // If there's already an operator and current input, calculate first
    if (operator && currentInput !== '') {
        calculate();
    }

    if (op === '.') {
        // Prevent multiple decimals
        if (currentInput.includes('.')) return;
        if (currentInput === '') currentInput = '0';
        currentInput += op;
    } else {
        previousValue = currentInput;
        currentInput = '';
        operator = op;
        shouldResetDisplay = true;
    }

    updateDisplay();
}

function calculate() {
    if (!operator || currentInput === '' || previousValue === '') return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    if (operator && previousValue && !shouldResetDisplay) {
        display.value = previousValue + ' ' + operator + ' ' + currentInput;
    } else {
        display.value = currentInput || '0';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendOperator('.');
    if (e.key === '+' || e.key === '-') appendOperator(e.key);
    if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    }
    if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    if (e.key === 'Escape') {
        e.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
