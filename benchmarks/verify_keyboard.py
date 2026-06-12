from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    url = f"file://{os.getcwd()}/index.html"
    page.goto(url)
    page.wait_for_timeout(500)

    # Test Keyboard Support
    page.keyboard.type("12+34=")
    page.wait_for_timeout(500)

    # Check if result is 46
    display = page.locator("#current-operand")
    if display.text_content() != "46":
        raise Exception(f"Expected 46, got {display.text_content()}")

    # Test DEL
    page.keyboard.press("Backspace")
    page.wait_for_timeout(200)
    if display.text_content() != "4":
        raise Exception(f"Expected 4, got {display.text_content()}")

    # Test AC
    page.keyboard.press("Escape")
    page.wait_for_timeout(200)
    if display.text_content() != "0":
        raise Exception(f"Expected 0, got {display.text_content()}")

    # Test Decimal logic again via keyboard
    page.keyboard.type("1.2.3")
    page.wait_for_timeout(200)
    if display.text_content() != "1.23":
        raise Exception(f"Expected 1.23, got {display.text_content()}")

    page.screenshot(path="/home/jules/verification/screenshots/keyboard_test.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
