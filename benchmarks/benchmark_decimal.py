import asyncio
from playwright.async_api import async_playwright
import time
import os

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        results = await page.evaluate("""
            () => {
                let longOperand = "1+2+3+4+5+6+7+8+9+0".repeat(100); // 1900 chars

                const startSplit = performance.now();
                for (let i = 0; i < 1000; i++) {
                    const segments = longOperand.split(/[+\-*/()]/);
                    const lastSegment = segments[segments.length - 1];
                    lastSegment.includes('.');
                }
                const endSplit = performance.now();
                const splitTime = endSplit - startSplit;

                const startIndex = performance.now();
                for (let i = 0; i < 1000; i++) {
                    const lastOpIndex = Math.max(
                        longOperand.lastIndexOf('+'),
                        longOperand.lastIndexOf('-'),
                        longOperand.lastIndexOf('*'),
                        longOperand.lastIndexOf('/'),
                        longOperand.lastIndexOf('('),
                        longOperand.lastIndexOf(')')
                    );
                    const lastSegment = longOperand.slice(lastOpIndex + 1);
                    lastSegment.includes('.');
                }
                const endIndex = performance.now();
                const indexTime = endIndex - startIndex;

                return { splitTime, indexTime };
            }
        """)

        print(f"Split approach: {results['splitTime']:.4f} ms")
        print(f"LastIndexOf approach: {results['indexTime']:.4f} ms")
        print(f"Improvement: {((results['splitTime'] - results['indexTime']) / results['splitTime'] * 100):.2f}%")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
