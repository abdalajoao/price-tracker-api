const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeBooks() {
  const isWindows = process.platform === "win32";

  const browser = await puppeteer.launch({
    args: isWindows ? [] : chromium.args,

    executablePath: isWindows
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : await chromium.executablePath(),

    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com/", {
    waitUntil: "networkidle2",
  });

  const results = await page.evaluate(() => {
    const books = [
      ...document.querySelectorAll(".product_pod")
    ];

    return books.map((b) => {
      const title =
        b.querySelector("h3 a").getAttribute("title");

      const price =
        b.querySelector(".price_color").innerText;

      const image =
        b.querySelector("img").getAttribute("src");

      return {
        title,
        price,
        image: new URL(
          image,
          "https://books.toscrape.com/"
        ).href,
      };
    });
  });

  await browser.close();

  return results;
}

module.exports = { scrapeBooks };