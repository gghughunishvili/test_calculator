import asyncio
import os
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Get absolute path to index.html
        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        # Helper to get display value
        async def get_display():
            return await page.inner_text("#current-operand")

        # Use exact text from buttons (Unicode characters)
        # ÷ (U+00F7), × (U+00D7), − (U+2212)

        # Test basic addition
        await page.click("button:has-text('1')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('=')")

        result = await get_display()
        print(f"1 + 2 = {result}")
        assert result == "3"

        # Test decimal optimization (multiple decimals in different segments)
        await page.click("button:has-text('AC')")
        await page.click("button:has-text('1')")
        await page.click("button:has-text('.')")
        await page.click("button:has-text('5')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('.')")
        await page.click("button:has-text('5')")

        display = await get_display()
        print(f"Input: {display}")
        assert display == "1.5+2.5"

        # Try to add another dot to the current segment (should be ignored)
        await page.click("button:has-text('.')")
        display = await get_display()
        print(f"After second dot: {display}")
        assert display == "1.5+2.5"

        await page.click("button:has-text('=')")
        result = await get_display()
        print(f"1.5 + 2.5 = {result}")
        assert result == "4"

        # Test parentheses and multiplication
        await page.click("button:has-text('AC')")
        await page.click("button:has-text('(')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('3')")
        await page.click("button:has-text(')')")
        await page.click("button:has-text('×')") # Unicode multiply
        await page.click("button:has-text('4')")
        await page.click("button:has-text('=')")

        result = await get_display()
        print(f"(2 + 3) * 4 = {result}")
        assert result == "20"

        # Take a screenshot for visual verification
        os.makedirs("verification/screenshots", exist_ok=True)
        await page.screenshot(path="verification/screenshots/calculator_verified.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
