const express = require("express");
const router = express.Router();
const { scrapeBooks } = require("../services/scraper");

router.get("/product", async (req, res) => {
  try {
    const { name, sort = "asc", page, limit = 20 } = req.query;

    let results = await scrapeBooks();

    // FILTER
    if (name) {
      results = results.filter(book =>
        book.title?.toLowerCase().includes(name.toLowerCase())
      );
    }

    // SORT
    results.sort((a, b) => {
      const priceA = parseFloat(a.price.replace("£", ""));
      const priceB = parseFloat(b.price.replace("£", ""));

      return sort === "desc"
        ? priceB - priceA
        : priceA - priceB;
    });

    const isAll = !page;

    let paginated = results;

    // PAGINATION ONLY IF page EXISTS
    if (!isAll) {
      const p = Number(page);
      const l = Number(limit);

      const start = (p - 1) * l;
      const end = start + l;

      paginated = results.slice(start, end);
    }

    res.json({
      total: results.length,
      page: page ? Number(page) : "all",
      totalPages: page ? Math.ceil(results.length / limit) : 1,
      results: paginated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;