const { performance } = require('perf_hooks');

function appendCharacterOriginal(currentOperand, char) {
    if (char === '.') {
        // Split by operators to find the last number segment
        const segments = currentOperand.split(/[+\-*/()]/);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.includes('.')) return currentOperand;
    }
    return currentOperand + char;
}

function appendCharacterOptimized(currentOperand, char) {
    if (char === '.') {
        // Find the index of the last operator or parenthesis
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

const iterations = 100000;
const longOperand = "1+2+3+4+5+6+7+8+9+0+1+2+3+4+5+6+7+8+9+0.5";

// Warm up
for (let i = 0; i < 1000; i++) {
    appendCharacterOriginal(longOperand, '.');
    appendCharacterOptimized(longOperand, '.');
}

console.log('Starting benchmark...');

let start = performance.now();
for (let i = 0; i < iterations; i++) {
    appendCharacterOriginal(longOperand, '.');
}
let end = performance.now();
const originalTime = end - start;
console.log(`Original appendCharacter: ${originalTime.toFixed(4)}ms`);

start = performance.now();
for (let i = 0; i < iterations; i++) {
    appendCharacterOptimized(longOperand, '.');
}
end = performance.now();
const optimizedTime = end - start;
console.log(`Optimized appendCharacter: ${optimizedTime.toFixed(4)}ms`);

const improvement = ((originalTime - optimizedTime) / originalTime * 100).toFixed(2);
console.log(`Improvement: ${improvement}%`);
