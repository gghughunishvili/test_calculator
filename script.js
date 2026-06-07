let currentOperand = '';
let previousOperand = '';

/**
 * Cache DOM elements for faster access.
 * These are placed at the top level, which is safe as the script is loaded
 * at the bottom of the body in index.html.
 */
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

/**
 * Optimized: append character with efficient decimal point validation
 * avoiding expensive string splitting and regex.
 */
function appendCharacter(char) {
    if (char === '.') {
        // Ensure currentOperand is a string before calling lastIndexOf
        const opStr = currentOperand.toString();
        // Find the last operator or parenthesis to isolate the current numeric segment
        const lastOperatorIndex = Math.max(
            opStr.lastIndexOf('+'),
            opStr.lastIndexOf('-'),
            opStr.lastIndexOf('*'),
            opStr.lastIndexOf('/'),
            opStr.lastIndexOf('('),
            opStr.lastIndexOf(')')
        );
        // Efficiently check if the current segment already contains a decimal point
        if (opStr.indexOf('.', lastOperatorIndex + 1) !== -1) return;
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
    // Ensure currentOperand is a string before slicing to prevent crashes if it's a number
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

        // Use Function constructor for evaluation as a safer alternative to eval()
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
 * Optimized: update display using cached DOM references and textContent
 * to minimize layout reflows and DOM lookup overhead.
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
