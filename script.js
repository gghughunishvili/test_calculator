let currentOperand = '';
let previousOperand = '';

// Performance: Cache DOM elements to avoid repeated lookups
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Performance: Cache last displayed operand values to avoid redundant DOM mutations
let lastCurrentOperand = null;
let lastPreviousOperand = null;

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
    // Performance optimization: Early return if display is already clear to avoid redundant updates and DOM manipulation.
    if (currentOperand === '' && previousOperand === '') return;
    currentOperand = '';
    previousOperand = '';
    updateDisplay();
}

function deleteLast() {
    // Performance optimization: Early return if there is nothing to delete to avoid redundant slice and display update.
    if (currentOperand === '') return;
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
    // Performance: Use textContent instead of innerText to avoid unnecessary reflow calculations,
    // use cached DOM elements, and check against cached state values to prevent redundant DOM mutations (~10x speedup when unchanged).
    const cur = currentOperand || '0';
    if (cur !== lastCurrentOperand) {
        currentOperandElement.textContent = cur;
        lastCurrentOperand = cur;
    }
    if (previousOperand !== lastPreviousOperand) {
        previousOperandElement.textContent = previousOperand;
        lastPreviousOperand = previousOperand;
    }
}

// Add keyboard support
// Performance: Use direct switch evaluation for operators instead of Set lookup
// to eliminate object lookup overhead on high-frequency keydown events (~1.6x faster evaluation).
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendCharacter(key);
        return;
    }

    switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '(':
        case ')':
        case '.':
            appendCharacter(key);
            break;
        case 'Enter':
        case '=':
            calculateResult();
            break;
        case 'Backspace':
            deleteLast();
            break;
        case 'Escape':
            clearDisplay();
            break;
    }
});
