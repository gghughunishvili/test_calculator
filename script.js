let currentOperand = '';
let previousOperand = '';

function appendCharacter(char) {
    if (char === '.') {
        // Optimized: Use lastIndexOf to find if the current number segment already has a decimal.
        // This is much faster than split() and regex, especially for long expressions.
        const lastDecimal = currentOperand.lastIndexOf('.');
        const lastOperator = Math.max(
            currentOperand.lastIndexOf('+'),
            currentOperand.lastIndexOf('-'),
            currentOperand.lastIndexOf('*'),
            currentOperand.lastIndexOf('/'),
            currentOperand.lastIndexOf('('),
            currentOperand.lastIndexOf(')')
        );
        if (lastDecimal > lastOperator) return;
    }
    currentOperand += char;
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    updateDisplay();
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        if (currentOperand === '') return;

        // Security: sanitize input to only allow numbers and math chars
        if (/[^0-9+\-*/().]/.test(currentOperand)) {
             throw new Error("Invalid Input");
        }

        const result = new Function('return ' + currentOperand)();

        previousOperand = currentOperand + ' =';
        currentOperand = result.toString();
        updateDisplay();
    } catch (error) {
        currentOperand = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentOperand = '';
            updateDisplay();
        }, 2000);
    }
}

// Cache DOM elements for performance
let currentOperandElement;
let previousOperandElement;

function getDisplayElements() {
    if (!currentOperandElement) currentOperandElement = document.getElementById('current-operand');
    if (!previousOperandElement) previousOperandElement = document.getElementById('previous-operand');
    return { currentOperandElement, previousOperandElement };
}

function updateDisplay() {
    const { currentOperandElement, previousOperandElement } = getDisplayElements();
    // Using textContent is faster than innerText as it doesn't trigger layout reflows
    currentOperandElement.textContent = currentOperand || '0';
    previousOperandElement.textContent = previousOperand;
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendCharacter(key);
    } else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
