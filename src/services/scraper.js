const puppeteer = require("puppeteer");

async function scrapeBooks() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let allResults = [];

  const TOTAL_PAGES = 50;

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const url =
      i === 1
        ? "https://books.toscrape.com/"
        : `https://books.toscrape.com/catalogue/page-${i}.html`;

    await page.goto(url, {
      waitUntil: "domcontentloaded"
    });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll(".product_pod");

      return Array.from(items).map(item => {
        const img = item.querySelector("img")?.getAttribute("src");

        return {
          title: item.querySelector("h3 a")?.getAttribute("title"),
          price: item.querySelector(".price_color")?.innerText,
          image: img
        };
      });
    });

    allResults = [...allResults, ...results];
  }

  // correct image URLs
  allResults = allResults.map(book => ({
    ...book,
    image: `https://books.toscrape.com/${book.image.replace("../", "")}`
  }));

  // sort by price
  allResults.sort((a, b) => {
    return (
      parseFloat(a.price.replace("£", "")) -
      parseFloat(b.price.replace("£", ""))
    );
  });

  await browser.close();

  return allResults;
}

module.exports = { scrapeBooks };