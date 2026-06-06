
function appendCharacterOld(char, currentOperand) {
    if (char === '.') {
        // Split by operators to find the last number segment
        const segments = currentOperand.split(/[+\-*/()]/);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.includes('.')) return currentOperand;
    }
    return currentOperand + char;
}

function appendCharacterNew(char, currentOperand) {
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

const iterations = 1000000;
const testString = "1+2*3-4/5+(6*7).89+123.456+789";

console.time('Old');
let resOld = testString;
for (let i = 0; i < iterations; i++) {
    resOld = appendCharacterOld('.', testString);
}
console.timeEnd('Old');

console.time('New');
let resNew = testString;
for (let i = 0; i < iterations; i++) {
    resNew = appendCharacterNew('.', testString);
}
console.timeEnd('New');
