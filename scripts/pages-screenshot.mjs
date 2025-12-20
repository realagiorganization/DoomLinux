import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const targetUrl =
  process.env.PAGES_URL ||
  "https://realagiorganization.github.io/DoomLinux/";
const outputPath =
  process.env.SCREENSHOT_PATH ||
  "tests/artifacts/pages-screenshot.png";

const outputDir = path.dirname(outputPath);
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(targetUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Saved screenshot to ${outputPath}`);
