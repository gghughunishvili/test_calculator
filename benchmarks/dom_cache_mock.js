
function updateDisplayOld(currentOperand, previousOperand) {
    // Simulated document.getElementById
    const el1 = { textContent: '' };
    const el2 = { textContent: '' };
    el1.textContent = currentOperand || '0';
    el2.textContent = previousOperand;
}

const currentOperandElement = { textContent: '' };
const previousOperandElement = { textContent: '' };

function updateDisplayNew(currentOperand, previousOperand) {
    currentOperandElement.textContent = currentOperand || '0';
    previousOperandElement.textContent = previousOperand;
}

const iterations = 10000000;

console.time('Old Mock');
for (let i = 0; i < iterations; i++) {
    updateDisplayOld('123', '456');
}
console.timeEnd('Old Mock');

console.time('New Mock');
for (let i = 0; i < iterations; i++) {
    updateDisplayNew('123', '456');
}
console.timeEnd('New Mock');
