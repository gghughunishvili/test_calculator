
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="current-operand"></div><div id="previous-operand"></div></body></html>');
global.document = dom.window.document;

function updateDisplayOld(currentOperand, previousOperand) {
    document.getElementById('current-operand').textContent = currentOperand || '0';
    document.getElementById('previous-operand').textContent = previousOperand;
}

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplayNew(currentOperand, previousOperand) {
    currentOperandElement.textContent = currentOperand || '0';
    previousOperandElement.textContent = previousOperand;
}

const iterations = 100000;

console.time('Old DOM');
for (let i = 0; i < iterations; i++) {
    updateDisplayOld('123', '456');
}
console.timeEnd('Old DOM');

console.time('New DOM');
for (let i = 0; i < iterations; i++) {
    updateDisplayNew('123', '456');
}
console.timeEnd('New DOM');
