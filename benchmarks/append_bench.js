const { performance } = require('perf_hooks');

function appendCharacter_original(char, currentOperand) {
    if (char === '.') {
        const segments = currentOperand.split(/[+\-*/()]/);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.includes('.')) return currentOperand;
    }
    return currentOperand + char;
}

function appendCharacter_optimized(char, currentOperand) {
    if (char === '.') {
        const lastOperatorIndex = Math.max(
            currentOperand.lastIndexOf('+'),
            currentOperand.lastIndexOf('-'),
            currentOperand.lastIndexOf('*'),
            currentOperand.lastIndexOf('/'),
            currentOperand.lastIndexOf('('),
            currentOperand.lastIndexOf(')')
        );
        const lastSegment = currentOperand.slice(lastOperatorIndex + 1);
        if (lastSegment.includes('.')) return currentOperand;
    }
    return currentOperand + char;
}

const longOperand = "1+2*3/4-5+(6*7)".repeat(100);

function runBenchmark(fn, name) {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
        fn('.', longOperand);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
}

runBenchmark(appendCharacter_original, 'Original');
runBenchmark(appendCharacter_optimized, 'Optimized');
