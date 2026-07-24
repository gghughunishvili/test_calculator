let currentOperand = '';
let previousOperand = '';

// Performance: Use lazy initialization to cache DOM elements safely,
// avoiding issues if the script is loaded before the DOM elements are parsed.
let currentOperandElement = null;
let previousOperandElement = null;

function getCurrentOperandElement() {
    if (!currentOperandElement) {
        currentOperandElement = document.getElementById('current-operand');
    }
    return currentOperandElement;
}

function getPreviousOperandElement() {
    if (!previousOperandElement) {
        previousOperandElement = document.getElementById('previous-operand');
    }
    return previousOperandElement;
}

function appendCharacter(char) {
    if (char === '.') {
        // Performance optimization: Instead of splitting the entire expression by regex,
        // which allocates new arrays and substrings (O(N) time and memory complexity),
        // scan backwards to check if the last segment contains a decimal (O(M) where M is segment length).
        let hasDecimal = false;
        for (let i = currentOperand.length - 1; i >= 0; i--) {
            const c = currentOperand[i];
            if (c === '.') {
                hasDecimal = true;
                break;
            }
            if (c === '+' || c === '-' || c === '*' || c === '/' || c === '(' || c === ')') {
                break; // Hit segment boundary, no decimal in the last segment
            }
        }
        if (hasDecimal) return;
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
    // and use lazy-loaded cached DOM elements
    getCurrentOperandElement().textContent = currentOperand || '0';
    getPreviousOperandElement().textContent = previousOperand;
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
