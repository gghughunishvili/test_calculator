
from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    file_path = "file://" + os.path.abspath("index.html")
    page.goto(file_path)
    page.wait_for_timeout(500)

    # Perform a calculation: (12 + 8) / 4 = 5
    page.click("button:has-text('(')")
    page.wait_for_timeout(500)
    page.click("button:has-text('1')")
    page.wait_for_timeout(500)
    page.click("button:has-text('2')")
    page.wait_for_timeout(500)
    page.click("button:has-text('+')")
    page.wait_for_timeout(500)
    page.click("button:has-text('8')")
    page.wait_for_timeout(500)
    page.click("button:has-text(')')")
    page.wait_for_timeout(500)
    page.click("button:has-text('÷')")
    page.wait_for_timeout(500)
    page.click("button:has-text('4')")
    page.wait_for_timeout(500)
    page.click("button:has-text('=')")
    page.wait_for_timeout(500)

    # Take screenshot at the final state
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
