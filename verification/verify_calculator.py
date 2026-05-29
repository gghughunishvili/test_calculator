import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    file_path = f"file://{os.path.abspath('index.html')}"
    page.goto(file_path)
    page.wait_for_timeout(500)

    # CUJ: Perform a calculation (12 + 34)
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="+", exact=True).click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="3").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="4").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(500)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)  # Hold final state for the video

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
            context.close()  # MUST close context to save the video
            browser.close()
