
function updateDisplay() {
    console.time('document.getElementById');
    const current = document.getElementById('current-operand');
    const previous = document.getElementById('previous-operand');
    console.timeEnd('document.getElementById');

    current.innerText = '0';
    previous.innerText = '';
}

const iterations = 10000;
let totalTime = 0;

// Mock document
global.document = {
    getElementById: (id) => ({
        set innerText(val) {}
    })
};

const start = Date.now();
for (let i = 0; i < iterations; i++) {
    const current = document.getElementById('current-operand');
    const previous = document.getElementById('previous-operand');
    current.innerText = '123';
    previous.innerText = '456';
}
const end = Date.now();
console.log(`Execution time for ${iterations} iterations: ${end - start}ms`);

// Cached version
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

const startCached = Date.now();
for (let i = 0; i < iterations; i++) {
    currentOperandElement.innerText = '123';
    previousOperandElement.innerText = '456';
}
const endCached = Date.now();
console.log(`Execution time (cached) for ${iterations} iterations: ${endCached - startCached}ms`);
