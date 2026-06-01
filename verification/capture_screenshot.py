from playwright.sync_api import sync_playwright
import os

def capture_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the local index.html
        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        # In index.html, multiplication button has text '×' (multiplication sign), not '*'
        page.click("button:has-text('5')")
        page.click("button:has-text('×')")
        page.click("button:has-text('5')")
        page.click("button:has-text('=')")

        # Ensure verification directory exists
        os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

        screenshot_path = "/home/jules/verification/screenshots/calculator_optimized.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    capture_screenshot()
