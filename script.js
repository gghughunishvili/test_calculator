let currentOperand = '';
let previousOperand = '';

// Performance: Cache DOM elements to avoid repeated lookups
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Performance: Hoist regular expression to module scope to prevent re-compilation / re-instantiation
// of the RegExp object on every calculateResult execution.
const SANITIZE_REGEX = /[^0-9+\-*/().]/;

function appendCharacter(char) {
    if (char === '.') {
        // Performance optimization: Use a manual reverse loop to find the last operator or decimal in the current segment.
        // This avoids expensive regular expression splitting and temporary array creation.
        for (let i = currentOperand.length - 1; i >= 0; i--) {
            const c = currentOperand[i];
            if (c === '.') return; // A decimal already exists in the current number segment, ignore.
            if (c === '+' || c === '-' || c === '*' || c === '/' || c === '(' || c === ')') {
                break; // Found segment boundary; can safely append a decimal point.
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

        // Security: sanitize input to only allow numbers and math chars using hoisted RegExp
        if (SANITIZE_REGEX.test(currentOperand)) {
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
// Performance: Use Set lookup and direct character range check instead of regular expressions
// and inline array creation to avoid overhead on every keydown event.
const VALID_OPERATORS = new Set(['+', '-', '*', '/', '(', ')', '.']);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendCharacter(key);
    } else if (VALID_OPERATORS.has(key)) {
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
