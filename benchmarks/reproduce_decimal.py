import os
from playwright.sync_api import sync_playwright

def test_decimal_logic():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        # Scenario 1: '12.3+4' -> should be able to append '.' -> '12.3+4.'
        page.evaluate("currentOperand = '12.3+4'; updateDisplay();")
        page.evaluate("appendCharacter('.')")
        result1 = page.evaluate("currentOperand")
        print(f"Scenario 1 ('12.3+4' + '.'): {result1}")

        # Scenario 2: '12.3' -> should NOT be able to append '.'
        page.evaluate("currentOperand = '12.3'; updateDisplay();")
        page.evaluate("appendCharacter('.')")
        result2 = page.evaluate("currentOperand")
        print(f"Scenario 2 ('12.3' + '.'): {result2}")

        # Scenario 3: '12.3+4.5' -> should NOT be able to append '.'
        page.evaluate("currentOperand = '12.3+4.5'; updateDisplay();")
        page.evaluate("appendCharacter('.')")
        result3 = page.evaluate("currentOperand")
        print(f"Scenario 3 ('12.3+4.5' + '.'): {result3}")

        browser.close()

if __name__ == "__main__":
    test_decimal_logic()
