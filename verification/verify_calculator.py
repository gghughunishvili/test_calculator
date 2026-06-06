
import asyncio
from playwright.async_api import async_playwright
import os

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Load the local index.html
        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        async def get_display():
            return await page.text_content("#current-operand")

        async def click_btn(text):
            # Using text since it's a calculator with unique button labels
            # Note: ÷ is / and × is *
            if text == '/':
                await page.click("button:has-text('÷')")
            elif text == '*':
                await page.click("button:has-text('×')")
            elif text == '-':
                await page.click("button:has-text('−')")
            else:
                await page.click(f"button:has-text('{text}')")

        # Test 1: Basic addition
        await click_btn('1')
        await click_btn('+')
        await click_btn('2')
        await click_btn('=')
        result = await get_display()
        print(f"Test 1 (1+2=): {result}")
        assert result == "3"

        # Test 2: Clear
        await click_btn('AC')
        result = await get_display()
        print(f"Test 2 (AC): {result}")
        assert result == "0"

        # Test 3: Multiple decimals in one segment (should be blocked)
        await click_btn('1')
        await click_btn('.')
        await click_btn('2')
        await click_btn('.')
        await click_btn('3')
        result = await get_display()
        print(f"Test 3 (1.2.3): {result}")
        assert result == "1.23"

        # Test 4: Decimals in different segments
        await click_btn('+')
        await click_btn('4')
        await click_btn('.')
        await click_btn('5')
        await click_btn('=')
        result = await get_display()
        print(f"Test 4 (1.23 + 4.5): {result}")
        assert result == "5.73"

        # Test 5: Delete
        await click_btn('DEL')
        result = await get_display()
        print(f"Test 5 (Delete): {result}")
        assert result == "5.7"

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
