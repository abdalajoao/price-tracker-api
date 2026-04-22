const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeBooks() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com/");

  const results = await page.evaluate(() => {
    const books = [...document.querySelectorAll(".product_pod")];

    return books.map(b => ({
      title: b.querySelector("h3 a").title,
      price: b.querySelector(".price_color").innerText
    }));
  });

  await browser.close();

  return results;
}

module.exports = { scrapeBooks };