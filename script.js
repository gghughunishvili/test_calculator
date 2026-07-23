let currentOperand = '';
let previousOperand = '';

// Performance: Use lazy initialization to cache DOM elements,
// avoiding repeated lookups and ensuring safe initialization before DOM load.
let currentOperandElement = null;
let previousOperandElement = null;

function appendCharacter(char) {
    if (char === '.') {
        // Performance optimization: Avoid expensive string splitting and regex/array allocation
        // by scanning backwards to find the last segment boundary (operator/bracket/decimal).
        const operandStr = currentOperand.toString();
        for (let i = operandStr.length - 1; i >= 0; i--) {
            const c = operandStr[i];
            if (c === '.') return; // Last segment already has a decimal point, skip
            if (c === '+' || c === '-' || c === '*' || c === '/' || c === '(' || c === ')') {
                break; // Found segment boundary, we can append decimal point
            }
        }
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
    // Remove redundant .toString() call as currentOperand is already a string
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        if (currentOperand === '') return;

        // Security: sanitize input to only allow numbers and math chars.
        // Properly escape hyphen and forward slash for strict JS environments.
        if (/[^0-9+\-\*\/().]/.test(currentOperand)) {
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
    // Performance: Lazily initialize and cache DOM element references
    if (!currentOperandElement) {
        currentOperandElement = document.getElementById('current-operand');
    }
    if (!previousOperandElement) {
        previousOperandElement = document.getElementById('previous-operand');
    }

    // Performance: Use textContent instead of innerText to avoid unnecessary reflow calculations
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
