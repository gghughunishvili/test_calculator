let currentOperand = '';
let previousOperand = '';

function appendCharacter(char) {
    if (char === '.') {
        // Find the last operator to isolate the current number segment
        // This is more efficient than splitting the whole string into an array
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

let currentOperandElement;
let previousOperandElement;

function getDisplayElements() {
    if (!currentOperandElement) {
        currentOperandElement = document.getElementById('current-operand');
    }
    if (!previousOperandElement) {
        previousOperandElement = document.getElementById('previous-operand');
    }
    return { currentOperandElement, previousOperandElement };
}

function updateDisplay() {
    if (!currentOperandElement || !previousOperandElement) {
        getDisplayElements();
    }

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
