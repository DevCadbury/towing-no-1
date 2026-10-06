/**
 * Browser Control & Live Audit Script with Stealth (Puppeteer Extra + Stealth)
 * 
 * Usage:
 *   node scripts/browser-control.mjs http://noxtools.com/
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import readline from 'readline';

puppeteer.use(StealthPlugin());

const targetUrl = process.argv[2] || 'http://noxtools.com/';

async function promptUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

(async () => {
  console.log(`[BrowserControl] Launching headed Chrome with Stealth Plugin (bypassing Cloudflare)...`);
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();

  console.log(`[BrowserControl] Navigating to: ${targetUrl}`);
  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (err) {
    console.log(`[BrowserControl] Navigation note: ${err.message}`);
  }

  console.log(`\n============================================================`);
  console.log(`[BrowserControl] BROWSER ACTIVE WITH STEALTH PLUGIN`);
  console.log(`1. If Cloudflare verification is showing, complete the check in the browser window.`);
  console.log(`2. Log in manually if required, and navigate to Semrush / target reports.`);
  console.log(`3. Once you reach the destination page, return to this terminal and press [ENTER].`);
  console.log(`============================================================\n`);

  await promptUser('Press [ENTER] when you are logged in and ready to capture...');

  const currentUrl = page.url();
  const title = await page.title();
  console.log(`\n[BrowserControl] Captured Current URL: ${currentUrl}`);
  console.log(`[BrowserControl] Captured Page Title: ${title}`);

  // Take screenshot
  const screenshotPath = 'F:\\town\\noxtools-semrush-snapshot.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`[BrowserControl] Screenshot saved to: ${screenshotPath}`);

  // Extract text snippet
  const textContent = await page.evaluate(() => document.body.innerText.slice(0, 3000));
  console.log(`\n[BrowserControl] Page Text Snippet:\n${textContent.slice(0, 800)}...\n`);

  console.log(`[BrowserControl] Keeping browser open for 60 seconds...`);
  await new Promise(r => setTimeout(r, 60000));

  await browser.close();
  console.log(`[BrowserControl] Done.`);
})();
