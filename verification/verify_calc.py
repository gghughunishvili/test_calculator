import asyncio
from playwright.async_api import async_playwright
import os

async def verify_calculator():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        # Helper to click a button by text
        async def click_btn(text):
            await page.click(f"button:has-text('{text}')")

        # Test 1: 2 + 3 = 5
        await click_btn("2")
        await click_btn("+")
        await click_btn("3")
        await click_btn("=")

        current_operand = await page.text_content("#current-operand")
        previous_operand = await page.text_content("#previous-operand")

        print(f"Result of 2+3: {current_operand}")
        print(f"Previous display: {previous_operand}")

        assert current_operand == "5"
        assert previous_operand == "2+3 ="

        # Test 2: AC
        await click_btn("AC")
        current_operand = await page.text_content("#current-operand")
        assert current_operand == "0"

        # Test 3: Decimal validation (should only allow one dot per number segment)
        await click_btn("1")
        await click_btn(".")
        await click_btn("2")
        await click_btn(".")  # Should be ignored
        await click_btn("3")

        current_operand = await page.text_content("#current-operand")
        print(f"Result of '1.2.3': {current_operand}")
        assert current_operand == "1.23"

        # Test 4: Decimal after operator
        await click_btn("+")
        await click_btn("0")
        await click_btn(".")
        await click_btn("5")
        current_operand = await page.text_content("#current-operand")
        print(f"Result of '1.23+0.5': {current_operand}")
        assert current_operand == "1.23+0.5"

        print("Verification successful!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_calculator())
