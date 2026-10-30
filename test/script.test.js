const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const scriptCode = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');

function createCalculatorContext() {
    const listeners = {};
    const elements = {
        'current-operand': { textContent: '0' },
        'previous-operand': { textContent: '' }
    };

    const mockDocument = {
        getElementById(id) {
            return elements[id] || null;
        },
        addEventListener(event, fn) {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(fn);
        }
    };

    const context = {
        document: mockDocument,
        setTimeout: (fn, ms) => setTimeout(fn, ms),
        // Expose helper to emit events
        emitKeydown(key, modifiers = {}) {
            if (listeners['keydown']) {
                listeners['keydown'].forEach(fn => fn({
                    key,
                    ctrlKey: !!modifiers.ctrlKey,
                    altKey: !!modifiers.altKey,
                    metaKey: !!modifiers.metaKey
                }));
            }
        },
        elements
    };

    vm.createContext(context);
    vm.runInContext(scriptCode, context);

    return context;
}

describe('Calculator script.js tests', () => {
    let ctx;

    beforeEach(() => {
        ctx = createCalculatorContext();
    });

    describe('appendCharacter', () => {
        test('appends numbers and updates display', () => {
            ctx.appendCharacter('1');
            ctx.appendCharacter('2');
            ctx.appendCharacter('3');
            assert.equal(ctx.elements['current-operand'].textContent, '123');
        });

        test('handles single decimal point per number segment', () => {
            ctx.appendCharacter('1');
            ctx.appendCharacter('.');
            ctx.appendCharacter('2');
            ctx.appendCharacter('.'); // Should be ignored
            assert.equal(ctx.elements['current-operand'].textContent, '1.2');
        });

        test('allows decimal points in different number segments', () => {
            ctx.appendCharacter('1');
            ctx.appendCharacter('.');
            ctx.appendCharacter('2');
            ctx.appendCharacter('+');
            ctx.appendCharacter('3');
            ctx.appendCharacter('.');
            ctx.appendCharacter('4');
            assert.equal(ctx.elements['current-operand'].textContent, '1.2+3.4');
        });

        test('handles decimal point after parentheses', () => {
            ctx.appendCharacter('(');
            ctx.appendCharacter('.');
            ctx.appendCharacter('5');
            assert.equal(ctx.elements['current-operand'].textContent, '(.5');
        });

        test('appends operators and parentheses correctly', () => {
            ctx.appendCharacter('(');
            ctx.appendCharacter('5');
            ctx.appendCharacter('+');
            ctx.appendCharacter('3');
            ctx.appendCharacter(')');
            ctx.appendCharacter('*');
            ctx.appendCharacter('2');
            assert.equal(ctx.elements['current-operand'].textContent, '(5+3)*2');
        });
    });

    describe('clearDisplay', () => {
        test('clears current and previous operands', () => {
            ctx.appendCharacter('5');
            ctx.appendCharacter('+');
            ctx.appendCharacter('5');
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, '10');
            assert.equal(ctx.elements['previous-operand'].textContent, '5+5 =');

            ctx.clearDisplay();

            assert.equal(ctx.elements['current-operand'].textContent, '0');
            assert.equal(ctx.elements['previous-operand'].textContent, '');
        });

        test('does nothing if display is already clear', () => {
            ctx.clearDisplay();
            assert.equal(ctx.elements['current-operand'].textContent, '0');
            assert.equal(ctx.elements['previous-operand'].textContent, '');
        });
    });

    describe('deleteLast', () => {
        test('deletes the last character from current operand', () => {
            ctx.appendCharacter('1');
            ctx.appendCharacter('2');
            ctx.appendCharacter('3');
            ctx.deleteLast();
            assert.equal(ctx.elements['current-operand'].textContent, '12');
        });

        test('shows 0 when last remaining character is deleted', () => {
            ctx.appendCharacter('7');
            ctx.deleteLast();
            assert.equal(ctx.elements['current-operand'].textContent, '0');
        });

        test('does nothing when current operand is already empty', () => {
            ctx.deleteLast();
            assert.equal(ctx.elements['current-operand'].textContent, '0');
        });
    });

    describe('calculateResult', () => {
        test('evaluates simple addition correctly', () => {
            ctx.appendCharacter('5');
            ctx.appendCharacter('+');
            ctx.appendCharacter('3');
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, '8');
            assert.equal(ctx.elements['previous-operand'].textContent, '5+3 =');
        });

        test('respects operator precedence', () => {
            ctx.appendCharacter('2');
            ctx.appendCharacter('+');
            ctx.appendCharacter('3');
            ctx.appendCharacter('*');
            ctx.appendCharacter('4');
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, '14');
            assert.equal(ctx.elements['previous-operand'].textContent, '2+3*4 =');
        });

        test('handles parentheses correctly', () => {
            ctx.appendCharacter('(');
            ctx.appendCharacter('2');
            ctx.appendCharacter('+');
            ctx.appendCharacter('3');
            ctx.appendCharacter(')');
            ctx.appendCharacter('*');
            ctx.appendCharacter('4');
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, '20');
            assert.equal(ctx.elements['previous-operand'].textContent, '(2+3)*4 =');
        });

        test('does nothing if current operand is empty', () => {
            ctx.calculateResult();
            assert.equal(ctx.elements['current-operand'].textContent, '0');
            assert.equal(ctx.elements['previous-operand'].textContent, '');
        });

        test('handles syntax errors gracefully', async () => {
            ctx.appendCharacter('5');
            ctx.appendCharacter('+');
            ctx.appendCharacter('*');
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, 'Error');

            // Wait for setTimeout (2000ms) to clear display
            await new Promise(resolve => setTimeout(resolve, 2100));
            assert.equal(ctx.elements['current-operand'].textContent, '0');
        });

        test('sanitizes input and rejects unauthorized characters', () => {
            // Directly set currentOperand in context if possible or inject via code evaluation
            ctx.appendCharacter('5');
            // Inject illegal character into currentOperand
            vm.runInContext("currentOperand = 'console.log(1)'", ctx);
            ctx.calculateResult();

            assert.equal(ctx.elements['current-operand'].textContent, 'Error');
        });
    });

    describe('updateDisplay', () => {
        test('displays 0 when currentOperand is empty', () => {
            ctx.updateDisplay();
            assert.equal(ctx.elements['current-operand'].textContent, '0');
        });

        test('caches state and avoids redundant DOM mutation', () => {
            ctx.appendCharacter('9');
            assert.equal(ctx.elements['current-operand'].textContent, '9');

            // Mutate DOM manually to see if updateDisplay skips writing when value hasn't changed
            ctx.elements['current-operand'].textContent = 'MUTATED';
            ctx.updateDisplay();
            assert.equal(ctx.elements['current-operand'].textContent, 'MUTATED');

            // When operand actually changes, DOM is updated
            ctx.appendCharacter('0');
            assert.equal(ctx.elements['current-operand'].textContent, '90');
        });
    });

    describe('keyboard navigation (keydown listener)', () => {
        test('handles single digit keys', () => {
            ctx.emitKeydown('5');
            ctx.emitKeydown('9');
            assert.equal(ctx.elements['current-operand'].textContent, '59');
        });

        test('handles operator keys', () => {
            ctx.emitKeydown('8');
            ctx.emitKeydown('+');
            ctx.emitKeydown('2');
            assert.equal(ctx.elements['current-operand'].textContent, '8+2');
        });

        test('handles Enter key for evaluation', () => {
            ctx.emitKeydown('4');
            ctx.emitKeydown('*');
            ctx.emitKeydown('3');
            ctx.emitKeydown('Enter');
            assert.equal(ctx.elements['current-operand'].textContent, '12');
            assert.equal(ctx.elements['previous-operand'].textContent, '4*3 =');
        });

        test('handles = key for evaluation', () => {
            ctx.emitKeydown('9');
            ctx.emitKeydown('/');
            ctx.emitKeydown('3');
            ctx.emitKeydown('=');
            assert.equal(ctx.elements['current-operand'].textContent, '3');
            assert.equal(ctx.elements['previous-operand'].textContent, '9/3 =');
        });

        test('handles Backspace key for deletion', () => {
            ctx.emitKeydown('1');
            ctx.emitKeydown('2');
            ctx.emitKeydown('Backspace');
            assert.equal(ctx.elements['current-operand'].textContent, '1');
        });

        test('handles Escape key for clearing display', () => {
            ctx.emitKeydown('1');
            ctx.emitKeydown('+');
            ctx.emitKeydown('2');
            ctx.emitKeydown('Enter');
            assert.equal(ctx.elements['current-operand'].textContent, '3');
            ctx.emitKeydown('Escape');
            assert.equal(ctx.elements['current-operand'].textContent, '0');
            assert.equal(ctx.elements['previous-operand'].textContent, '');
        });

        test('ignores unhandled keys', () => {
            ctx.emitKeydown('7');
            ctx.emitKeydown('a');
            ctx.emitKeydown('Shift');
            ctx.emitKeydown('ArrowLeft');
            assert.equal(ctx.elements['current-operand'].textContent, '7');
        });

        test('ignores shortcut keys pressed with modifiers', () => {
            ctx.emitKeydown('1');
            ctx.emitKeydown('c', { ctrlKey: true });
            ctx.emitKeydown('v', { ctrlKey: true });
            ctx.emitKeydown('r', { metaKey: true });
            ctx.emitKeydown('a', { altKey: true });
            assert.equal(ctx.elements['current-operand'].textContent, '1');
        });
    });
});
