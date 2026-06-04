import asyncio
import os
from playwright.async_api import async_playwright

async def verify_calculator():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Load the local index.html
        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        # Helper to get current operand text
        async def get_current():
            return await page.locator("#current-operand").text_content()

        # Test initial state
        assert await get_current() == "0"

        # Test appending numbers
        await page.click("button:text('7')")
        await page.click("button:text('8')")
        assert await get_current() == "78"

        # Test operations (multiplication uses '×')
        await page.click("button:text('×')")
        await page.click("button:text('2')")
        assert await get_current() == "78*2"

        # Test calculation
        await page.click("button:text('=')")
        assert await get_current() == "156"

        # Test DEL
        await page.click("button:text('DEL')")
        assert await get_current() == "15"

        # Test AC
        await page.click("button:text('AC')")
        assert await get_current() == "0"

        # Test complex expression
        await page.click("button:text('(')")
        await page.click("button:text('5')")
        await page.click("button:text('+')")
        await page.click("button:text('3')")
        await page.click("button:text(')')")
        await page.click("button:text('×')")
        await page.click("button:text('4')")
        assert await get_current() == "(5+3)*4"
        await page.click("button:text('=')")
        assert await get_current() == "32"

        print("Verification successful!")

        # Take a screenshot
        os.makedirs("verification/screenshots", exist_ok=True)
        await page.screenshot(path="verification/screenshots/calculator_verified.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_calculator())
