from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Navigate to the calculator
    url = f"file://{os.getcwd()}/index.html"
    page.goto(url)
    page.wait_for_timeout(500)

    # Test case 1: 1 + 2.5 * 4 = 11
    page.get_by_text("1", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text("+", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text("2", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text(".", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text("5", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text("×", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text("4", exact=True).click()
    page.wait_for_timeout(200)

    # Take screenshot before equals
    page.screenshot(path="/home/jules/verification/screenshots/before_calc.png")

    page.get_by_text("=", exact=True).click()
    page.wait_for_timeout(500)

    # Test case 2: Check decimal validation (should not allow multiple decimals in one segment)
    page.get_by_text(".", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_text(".", exact=True).click() # Should be ignored
    page.wait_for_timeout(200)

    # Take screenshot of final state
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

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
