import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    path = os.path.abspath("index.html")
    page.goto(f"file://{path}")
    page.wait_for_timeout(500)

    # Test 7 + 8 = 15
    page.get_by_role("button", name="7").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="+").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="8").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(500)

    # Verify result
    current = page.locator("#current-operand").text_content()
    print(f"Result of 7 + 8: {current}")
    assert current == "15"

    # Test AC
    page.get_by_role("button", name="AC").click()
    page.wait_for_timeout(500)
    current = page.locator("#current-operand").text_content()
    assert current == "0"

    # Test complex expression (5 + 5) * 2 = 20
    page.get_by_role("button", name="(").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="5").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="+").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="5").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name=")").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="×").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="2").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="=").click()
    page.wait_for_timeout(500)

    current = page.locator("#current-operand").text_content()
    print(f"Result of (5 + 5) * 2: {current}")
    assert current == "20"

    # Take screenshot at the final state
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
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
