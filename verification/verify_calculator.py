from playwright.sync_api import sync_playwright, expect
import os

def test_calculator():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        path = os.path.abspath("index.html")
        page.goto(f"file://{path}")

        # Test basic calculation via clicks
        page.get_by_role("button", name="1").click()
        page.get_by_role("button", name="+").click()
        page.get_by_role("button", name="2").click()
        page.get_by_role("button", name="=").click()

        expect(page.locator("#current-operand")).to_have_text("3")
        expect(page.locator("#previous-operand")).to_have_text("1+2 =")

        # Test clear
        page.get_by_role("button", name="AC").click()
        expect(page.locator("#current-operand")).to_have_text("0")
        expect(page.locator("#previous-operand")).to_be_empty()

        # More thorough click test
        page.get_by_role("button", name="5").click()
        page.get_by_role("button", name="×").click()
        page.get_by_role("button", name="6").click()
        page.get_by_role("button", name="=").click()
        expect(page.locator("#current-operand")).to_have_text("30")

        page.screenshot(path="verification/calculator_test.png")
        print("Functional verification successful.")
        browser.close()

if __name__ == "__main__":
    test_calculator()
