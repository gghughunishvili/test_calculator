import asyncio
from playwright.async_api import async_playwright
import os

async def test_calculator():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        # Test Addition: 1 + 2 = 3
        await page.get_by_role("button", name="1").click()
        await page.get_by_role("button", name="+").click()
        await page.get_by_role("button", name="2").click()
        await page.get_by_role("button", name="=").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "3", f"Expected 3, got {result}"

        # Test Clear
        await page.get_by_role("button", name="AC").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "0", f"Expected 0 after AC, got {result}"

        # Test Subtraction: 5 - 3 = 2
        await page.get_by_role("button", name="5").click()
        await page.get_by_role("button", name="−").click() # Note: Unicode minus
        await page.get_by_role("button", name="3").click()
        await page.get_by_role("button", name="=").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "2", f"Expected 2, got {result}"

        # Test Multiplication: 4 * 3 = 12
        await page.get_by_role("button", name="AC").click()
        await page.get_by_role("button", name="4").click()
        await page.get_by_role("button", name="×").click() # Note: Unicode times
        await page.get_by_role("button", name="3").click()
        await page.get_by_role("button", name="=").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "12", f"Expected 12, got {result}"

        # Test Division: 9 / 2 = 4.5
        await page.get_by_role("button", name="AC").click()
        await page.get_by_role("button", name="9").click()
        await page.get_by_role("button", name="÷").click() # Note: Unicode divide
        await page.get_by_role("button", name="2").click()
        await page.get_by_role("button", name="=").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "4.5", f"Expected 4.5, got {result}"

        # Test Decimal Point: 1.2 + 0.8 = 2
        await page.get_by_role("button", name="AC").click()
        await page.get_by_role("button", name="1").click()
        await page.get_by_role("button", name=".").click()
        await page.get_by_role("button", name="2").click()
        await page.get_by_role("button", name="+").click()
        await page.get_by_role("button", name="0").click()
        await page.get_by_role("button", name=".").click()
        await page.get_by_role("button", name="8").click()
        await page.get_by_role("button", name="=").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "2", f"Expected 2, got {result}"

        # Test Decimal Point restriction: 1..2 should be 1.2
        await page.get_by_role("button", name="AC").click()
        await page.get_by_role("button", name="1").click()
        await page.get_by_role("button", name=".").click()
        await page.get_by_role("button", name=".").click()
        await page.get_by_role("button", name="2").click()
        result = await page.locator("#current-operand").text_content()
        assert result == "1.2", f"Expected 1.2, got {result}"

        print("All tests passed!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_calculator())
