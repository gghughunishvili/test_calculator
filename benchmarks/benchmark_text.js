
// Mock document
global.document = {
    getElementById: (id) => ({
        set innerText(val) {},
        set textContent(val) {}
    })
};

const iterations = 100000;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

const startInnerText = Date.now();
for (let i = 0; i < iterations; i++) {
    currentOperandElement.innerText = '123';
    previousOperandElement.innerText = '456';
}
const endInnerText = Date.now();
console.log(`innerText: ${endInnerText - startInnerText}ms`);

const startTextContent = Date.now();
for (let i = 0; i < iterations; i++) {
    currentOperandElement.textContent = '123';
    previousOperandElement.textContent = '456';
}
const endTextContent = Date.now();
console.log(`textContent: ${endTextContent - startTextContent}ms`);
