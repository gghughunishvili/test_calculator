import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Since it's a static file, we can navigate directly
    path = os.path.abspath("index.html")
    page.goto(f"file://{path}")
    page.wait_for_timeout(500)

    # CUJ: Basic calculation
    # 1 + 2 * 3 = 7
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="+").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="×").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="3").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(500)

    # Verify result
    current_operand = page.locator("#current-operand")
    if current_operand.text_content() != "7":
        raise Exception(f"Expected 7, but got {current_operand.text_content()}")

    # CUJ: Test decimal point optimization logic
    # 1.2 + 3.4
    page.get_by_role("button", name="AC").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="1").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name=".").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="+").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="3").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name=".").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="4").click()
    page.wait_for_timeout(200)
    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(500)

    if current_operand.text_content() != "4.6":
        raise Exception(f"Expected 4.6, but got {current_operand.text_content()}")

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
