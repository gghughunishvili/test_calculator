from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    path = os.path.abspath("index.html")
    page.goto(f"file://{path}")
    page.wait_for_timeout(500)

    # Perform a calculation: 12.5 * 2 = 25
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name=".", exact=True).click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="5").click()
    page.wait_for_timeout(500)

    # Multiplication button text is '×'
    page.get_by_role("button", name="×").click()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(500)

    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(1000)

    # Take screenshot at the final state
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use explicit context to record video
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
