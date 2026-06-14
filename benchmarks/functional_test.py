import os
from playwright.sync_api import sync_playwright

def verify_functional():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        # Test basic arithmetic
        # Using evaluate to avoid issues with element clicking in some environments
        # but let's try to click buttons first for more realistic test.

        # 7 + 8 = 15
        page.click("text=7")
        page.click("text=+")
        page.click("text=8")
        page.click("text==")

        result = page.inner_text("#current-operand")
        print(f"7 + 8 = {result}")
        assert result == "15"

        # Clear
        page.click("text=AC")

        # Test decimal validation
        # 1.2.3 should become 1.23
        page.click("text=1")
        page.click("text=.")
        page.click("text=2")
        page.click("text=.")
        page.click("text=3")

        result = page.inner_text("#current-operand")
        print(f"Input '1.2.3' results in: {result}")
        assert result == "1.23"

        # Test complex expression with decimal optimization
        # 1.2 + 3.4 = 4.6
        page.click("text=AC")
        page.evaluate("appendCharacter('1'); appendCharacter('.'); appendCharacter('2'); appendCharacter('+'); appendCharacter('3'); appendCharacter('.'); appendCharacter('4');")
        page.click("text==")
        result = page.inner_text("#current-operand")
        print(f"1.2 + 3.4 = {result}")
        assert result == "4.6"

        print("Functional verification PASSED")
        browser.close()

if __name__ == "__main__":
    verify_functional()
