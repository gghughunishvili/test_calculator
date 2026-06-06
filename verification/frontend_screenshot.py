
from playwright.sync_api import sync_playwright
import os

def verify_and_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        path = os.path.abspath("index.html")
        page.goto(f"file://{path}")

        # Perform some operations to show the state
        page.click("button:has-text('7')")
        page.click("button:has-text('8')")
        page.click("button:has-text('9')")
        page.click("button:has-text('×')")
        page.click("button:has-text('5')")
        page.click("button:has-text('.')")
        page.click("button:has-text('2')")
        page.click("button:has-text('=')")

        # Wait a bit for any transitions
        page.wait_for_timeout(500)

        os.makedirs("/home/jules/verification", exist_ok=True)
        page.screenshot(path="/home/jules/verification/calculator_final.png")
        print("Screenshot saved to /home/jules/verification/calculator_final.png")

        browser.close()

if __name__ == "__main__":
    verify_and_screenshot()
