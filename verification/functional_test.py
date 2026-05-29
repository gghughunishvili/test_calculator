import asyncio
import os
from playwright.async_api import async_playwright

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = f"file://{os.path.abspath('index.html')}"
        await page.goto(file_path)

        # Test basic addition
        await page.click("button:has-text('1')")
        await page.click("button:has-text('+')")
        await page.click("button:has-text('2')")
        await page.click("button:has-text('=')")

        current_operand = await page.inner_text("#current-operand")
        assert current_operand == "3", f"Expected 3 but got {current_operand}"

        # Test clear
        await page.click("button:has-text('AC')")
        current_operand = await page.inner_text("#current-operand")
        assert current_operand == "0", f"Expected 0 but got {current_operand}"

        print("Verification: All basic tests passed.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
