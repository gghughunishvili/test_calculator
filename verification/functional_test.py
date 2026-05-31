
import asyncio
from playwright.async_api import async_playwright
import os

async def verify_calculator():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        # Test addition
        await page.click("button:has-text('1')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('=')")

        result = await page.inner_text("#current-operand")
        print(f"1 + 2 = {result}")
        assert result == "3"

        # Test Clear
        await page.click("button:has-text('AC')")
        result = await page.inner_text("#current-operand")
        print(f"After AC: {result}")
        assert result == "0"

        # Test Complex expression
        await page.click("button:has-text('(')")
        await page.click("button:has-text('5')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('5')")
        await page.click("button:has-text(')')")
        await page.click("button:has-text('×')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('=')")

        result = await page.inner_text("#current-operand")
        print(f"(5 + 5) * 2 = {result}")
        assert result == "20"

        print("All functional tests passed!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_calculator())
