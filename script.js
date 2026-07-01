let currentOperand = '';
let previousOperand = '';

// Cache DOM elements to avoid repeated lookups
let currentOperandElement = null;
let previousOperandElement = null;

function getDisplayElements() {
    if (!currentOperandElement) {
        currentOperandElement = document.getElementById('current-operand');
    }
    if (!previousOperandElement) {
        previousOperandElement = document.getElementById('previous-operand');
    }
    return { currentOperandElement, previousOperandElement };
}

function appendCharacter(char) {
    if (char === '.') {
        // Optimization: Use lastIndexOf to find the last operator and check for existing decimal
        // instead of splitting the entire string into an array.
        // This is significantly faster for long expressions.
        const lastOperatorIndex = Math.max(
            currentOperand.lastIndexOf('+'),
            currentOperand.lastIndexOf('-'),
            currentOperand.lastIndexOf('*'),
            currentOperand.lastIndexOf('/'),
            currentOperand.lastIndexOf('('),
            currentOperand.lastIndexOf(')')
        );
        const lastSegment = currentOperand.slice(lastOperatorIndex + 1);
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
    const { currentOperandElement, previousOperandElement } = getDisplayElements();
    // Optimization: Use textContent instead of innerText for faster updates (less reflow)
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
