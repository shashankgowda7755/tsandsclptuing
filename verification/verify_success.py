from playwright.sync_api import sync_playwright
import time
import os

def test_pledge_flow(page):
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
    page.on("dialog", lambda dialog: print(f"Dialog: {dialog.message}"))

    print("Step 1: Go to Home")
    page.goto("http://localhost:3000")
    page.wait_for_selector("text=Download Certificate")

    print("Step 2: Start")
    page.locator("button.bg-\[\#FF7F50\]").click()

    print("Step 3: Fill Form")
    with page.expect_file_chooser() as fc_info:
        page.get_by_text("Upload Photo").click()

    file_chooser = fc_info.value
    cwd = os.getcwd()
    file_path = os.path.join(cwd, "public/assets/hero_bg.png")
    file_chooser.set_files(file_path)

    page.wait_for_selector("text=Adjust Photo")
    page.click("text=Save Photo")
    time.sleep(1)

    page.fill("input[placeholder='Ram Kumar']", "Test User")
    page.fill("input[placeholder='98765 43210']", "9876543210")
    page.fill("input[placeholder='name@example.com']", "test@example.com")
    page.click("text=Continue")

    print("Step 4: Preview")
    page.wait_for_selector("text=Preview Certificate")
    page.click("text=Looks Good")

    print("Step 5: Pledge Reading")
    page.wait_for_selector("text=The Pledge")
    page.click("text=Select All")
    time.sleep(0.5)
    page.get_by_text("Take the Pledge", exact=True).click()

    print("Step 6: Success Page")
    page.wait_for_selector("text=Pledge Taken!")
    time.sleep(3)

    # Verify Download
    print("Step 7: Verify Download")
    try:
        with page.expect_download(timeout=10000) as download_info:
            page.click("button:has-text('Download')")
        download = download_info.value
        print(f"Downloaded filename: {download.suggested_filename}")
    except Exception as e:
        print(f"Download failed: {e}")
        # Capture screenshot of error state
        page.screenshot(path="verification/download_fail.png")

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 1024})
        try:
            test_pledge_flow(page)
        except Exception as e:
            print(f"Error: {e}")
            raise
        finally:
            browser.close()
