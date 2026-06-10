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

        # Test Case 1: Basic Arithmetic
        await page.click('button:text("1")')
        await page.click('button:text("+")')
        await page.click('button:text("2")')
        await page.click('button:text("=")')

        result = await page.text_content('#current-operand')
        previous = await page.text_content('#previous-operand')

        print(f"Test 1 (1+2): Result={result}, Previous={previous}")
        assert result == "3"
        assert previous == "1+2 ="

        # Test Case 2: Decimal Point Logic (Prevent double decimal)
        await page.click('button:text("AC")')
        await page.click('button:text("1")')
        await page.click('button:text(".")')
        await page.click('button:text("2")')
        await page.click('button:text(".")') # Should be ignored
        await page.click('button:text("3")')

        result = await page.text_content('#current-operand')
        print(f"Test 2 (1.2.3 -> 1.23): Result={result}")
        assert result == "1.23"

        # Test Case 3: Decimal Point after operator
        await page.click('button:text("+")')
        await page.click('button:text("4")')
        await page.click('button:text(".")')
        await page.click('button:text("5")')

        result = await page.text_content('#current-operand')
        print(f"Test 3 (1.23+4.5): Result={result}")
        assert result == "1.23+4.5"

        await page.click('button:text("=")')
        result = await page.text_content('#current-operand')
        print(f"Test 3 Result: {result}")
        assert float(result) == 5.73

        # Test Case 4: Subtraction button (special character −)
        await page.click('button:text("AC")')
        await page.click('button:text("5")')
        # The button text is "−" (U+2212) not "-"
        await page.click('button:text("−")')
        await page.click('button:text("3")')
        await page.click('button:text("=")')
        result = await page.text_content('#current-operand')
        print(f"Test 4 (5-3): Result={result}")
        assert result == "2"

        print("All functional tests passed!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_calculator())
