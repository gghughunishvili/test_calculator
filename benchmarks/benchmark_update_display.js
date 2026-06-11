const { performance } = require('perf_hooks');

// Mocking the DOM
const mockElement = {
    _text: '',
    set innerText(val) {
        // Simulate innerText's more expensive behavior
        // by doing some extra work
        this._text = val.toString().split('').join('');
    },
    get innerText() { return this._text; },
    set textContent(val) { this._text = val; },
    get textContent() { return this._text; }
};

const document = {
    getElementById: (id) => {
        // Return a fresh object each time for the original
        // to simulate the cost of getElementById
        return {
            set innerText(val) { this._text = val.toString(); },
            get innerText() { return this._text; }
        };
    }
};

const cachedElement = {
    set textContent(val) { this._text = val; },
    get textContent() { return this._text; }
};

// Original implementation
function updateDisplayOriginal(currentOperand, previousOperand) {
    document.getElementById('current-operand').innerText = currentOperand || '0';
    document.getElementById('previous-operand').innerText = previousOperand;
}

// Optimized implementation
const currentOperandElement = cachedElement;
const previousOperandElement = cachedElement;

function updateDisplayOptimized(currentOperand, previousOperand) {
    currentOperandElement.textContent = currentOperand || '0';
    previousOperandElement.textContent = previousOperand;
}

const iterations = 1000000;
const current = '12345';
const previous = '123 + 456 =';

// Run multiple trials
const trials = 5;
let totalOriginalTime = 0;
let totalOptimizedTime = 0;

console.log(`Starting benchmark with ${trials} trials and ${iterations} iterations each...`);

for (let t = 1; t <= trials; t++) {
    // Warm up
    for (let i = 0; i < 10000; i++) {
        updateDisplayOriginal(current, previous);
        updateDisplayOptimized(current, previous);
    }

    let start = performance.now();
    for (let i = 0; i < iterations; i++) {
        updateDisplayOriginal(current, previous);
    }
    let end = performance.now();
    const originalTime = end - start;
    totalOriginalTime += originalTime;

    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        updateDisplayOptimized(current, previous);
    }
    end = performance.now();
    const optimizedTime = end - start;
    totalOptimizedTime += optimizedTime;

    console.log(`Trial ${t}: Original: ${originalTime.toFixed(4)}ms, Optimized: ${optimizedTime.toFixed(4)}ms, Improvement: ${((originalTime - optimizedTime) / originalTime * 100).toFixed(2)}%`);
}

const avgOriginalTime = totalOriginalTime / trials;
const avgOptimizedTime = totalOptimizedTime / trials;
const avgImprovement = ((avgOriginalTime - avgOptimizedTime) / avgOriginalTime * 100).toFixed(2);

console.log('\n--- Final Results ---');
console.log(`Average Original updateDisplay: ${avgOriginalTime.toFixed(4)}ms`);
console.log(`Average Optimized updateDisplay: ${avgOptimizedTime.toFixed(4)}ms`);
console.log(`Average Improvement: ${avgImprovement}%`);
