// Cache DOM element references to avoid redundant lookups
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

let currentOperand = '';
let previousOperand = '';

function appendCharacter(char) {
    if (char === '.') {
        /**
         * PERFORMANCE OPTIMIZATION:
         * Replaced .split() with .lastIndexOf() to avoid expensive array creation and string splitting.
         * Using Math.max to find the boundary of the current numeric segment.
         */
        const lastOpIndex = Math.max(
            currentOperand.lastIndexOf('+'),
            currentOperand.lastIndexOf('-'),
            currentOperand.lastIndexOf('*'),
            currentOperand.lastIndexOf('/'),
            currentOperand.lastIndexOf('('),
            currentOperand.lastIndexOf(')'),
            currentOperand.lastIndexOf('÷'),
            currentOperand.lastIndexOf('×'),
            currentOperand.lastIndexOf('−')
        );
        const lastSegment = currentOperand.slice(lastOpIndex + 1);
        if (lastSegment.includes('.')) return;
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
    // Ensure currentOperand is a string before slicing
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

/**
 * PERFORMANCE OPTIMIZATION:
 * 1. Uses cached DOM references instead of document.getElementById.
 * 2. Uses textContent instead of innerText to minimize layout reflows.
 */
function updateDisplay() {
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
