let currentOperand = '';
let previousOperand = '';

// Performance optimization: Cache DOM element references to avoid repeated lookups
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function appendCharacter(char) {
    if (char === '.') {
        // Performance optimization: Avoid expensive string split and array creation.
        // Use lastIndexOf with the largest index to isolate the current numeric segment.
        const lastOpIndex = Math.max(
            currentOperand.lastIndexOf('+'),
            currentOperand.lastIndexOf('-'),
            currentOperand.lastIndexOf('*'),
            currentOperand.lastIndexOf('/'),
            currentOperand.lastIndexOf('('),
            currentOperand.lastIndexOf(')')
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
    // Ensure currentOperand is treated as a string before slicing
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

function updateDisplay() {
    // Performance optimization: Use cached elements and textContent to minimize reflows
    if (currentOperandElement) {
        currentOperandElement.textContent = currentOperand || '0';
    }
    if (previousOperandElement) {
        previousOperandElement.textContent = previousOperand;
    }
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
