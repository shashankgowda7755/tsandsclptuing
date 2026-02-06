from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000")
    page.screenshot(path="verification/home_debug.png")
    print(page.title())
    print(page.content())
    browser.close()
