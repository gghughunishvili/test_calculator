from playwright.sync_api import sync_playwright
import os

def run_functional_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the local index.html
        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        # Test 1 + 2 = 3
        page.click("button:has-text('1')")
        page.click("button:has-text('+')")
        page.click("button:has-text('2')")
        page.click("button:has-text('=')")

        current_operand = page.inner_text("#current-operand")
        previous_operand = page.inner_text("#previous-operand")

        print(f"Current Operand: {current_operand}")
        print(f"Previous Operand: {previous_operand}")

        assert current_operand == "3"
        assert previous_operand == "1+2 ="

        # Test Clear
        page.click("button:has-text('AC')")
        current_operand = page.inner_text("#current-operand")
        assert current_operand == "0"

        print("Functional test passed!")
        browser.close()

if __name__ == "__main__":
    run_functional_test()
