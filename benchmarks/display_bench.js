const { performance } = require('perf_hooks');

// Mock DOM elements
const mockElement = {
    set textContent(val) { this._textContent = val; },
    get textContent() { return this._textContent; },
    set innerText(val) { this._innerText = val; },
    get innerText() { return this._innerText; }
};

function updateDisplay_original(currentOperand, previousOperand) {
    mockElement.innerText = currentOperand || '0';
    mockElement.innerText = previousOperand;
}

function updateDisplay_optimized(currentOperand, previousOperand) {
    mockElement.textContent = currentOperand || '0';
    mockElement.textContent = previousOperand;
}

function runBenchmark(fn, name) {
    const start = performance.now();
    for (let i = 0; i < 1000000; i++) {
        fn('12345', '67890');
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
}

runBenchmark(updateDisplay_original, 'Original (innerText)');
runBenchmark(updateDisplay_optimized, 'Optimized (textContent)');
