let currentOperand = '';
let previousOperand = '';

// Performance: Cache DOM elements to avoid repeated lookups
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function appendCharacter(char) {
    if (char === '.') {
        // Performance: Use a manual reverse loop to find if the current number segment already has a decimal point.
        // This avoids creating multiple temporary strings and arrays with split().
        for (let i = currentOperand.length - 1; i >= 0; i--) {
            const c = currentOperand[i];
            if (c === '+' || c === '-' || c === '*' || c === '/' || c === '(' || c === ')') break;
            if (c === '.') return;
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
    // Current operand is already a string, so toString() is redundant
    currentOperand = currentOperand.slice(0, -1);
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
    // Performance: Use textContent instead of innerText to avoid unnecessary reflow calculations
    // and use cached DOM elements
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
