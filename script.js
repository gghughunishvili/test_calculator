let currentOperand = '';
let previousOperand = '';

// Cache DOM elements lazily for better performance
let currentOperandElement = null;
let previousOperandElement = null;

function appendCharacter(char) {
    // Ensure currentOperand is a string for string operations
    currentOperand = currentOperand.toString();

    if (char === '.') {
        // Optimization: Use lastIndexOf instead of split() to avoid array allocation
        // and improve performance on long expressions.
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
    // Optimization: Lazy initialization of cached elements
    if (!currentOperandElement) {
        currentOperandElement = document.getElementById('current-operand');
    }
    if (!previousOperandElement) {
        previousOperandElement = document.getElementById('previous-operand');
    }

    // Optimization: Use textContent instead of innerText to avoid unnecessary layout reflows
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
