const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// Mock DOM elements before importing script.js
const currentOperandEl = { textContent: '' };
const previousOperandEl = { textContent: '' };

global.document = {
    getElementById: (id) => {
        if (id === 'current-operand') return currentOperandEl;
        if (id === 'previous-operand') return previousOperandEl;
        return null;
    },
    addEventListener: () => {}
};

const calc = require('../script.js');

describe('appendCharacter - Decimal Point Validation Edge Cases', () => {
    beforeEach(() => {
        calc.setCurrentOperand('');
        calc.setPreviousOperand('');
        calc.clearDisplay();
        currentOperandEl.textContent = '';
        previousOperandEl.textContent = '';
    });

    it('ignores duplicate decimal point when number segment already has a decimal (single digit)', () => {
        calc.setCurrentOperand('5.');
        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '5.');
    });

    it('ignores duplicate decimal point in multi-digit floating point number', () => {
        calc.setCurrentOperand('123.45');
        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '123.45');
    });

    it('ignores consecutive decimal point attempts starting from empty display', () => {
        calc.setCurrentOperand('');
        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '.');
        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '.');
        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '.');
    });

    it('allows a decimal point in a new segment after an operator (+, -, *, /, (, ))', () => {
        const operators = ['+', '-', '*', '/', '(', ')'];
        for (const op of operators) {
            calc.setCurrentOperand(`12.3${op}`);
            calc.appendCharacter('.');
            assert.equal(calc.getCurrentOperand(), `12.3${op}.`, `Failed for operator ${op}`);
        }
    });

    it('ignores duplicate decimal point in second segment when second segment already has a decimal', () => {
        const operators = ['+', '-', '*', '/'];
        for (const op of operators) {
            calc.setCurrentOperand(`12.3${op}4.5`);
            calc.appendCharacter('.');
            assert.equal(calc.getCurrentOperand(), `12.3${op}4.5`, `Failed for expression with operator ${op}`);
        }
    });

    it('does not modify DOM textContent when appending a duplicate decimal is rejected', () => {
        calc.setCurrentOperand('10.5');
        calc.updateDisplay();
        const domBefore = currentOperandEl.textContent;

        calc.appendCharacter('.');
        assert.equal(calc.getCurrentOperand(), '10.5');
        assert.equal(currentOperandEl.textContent, domBefore);
    });
});
