const { scrape } = require("../scrapeModule/puppeteer");
exports.scrape = async (req, res) => {
  let shopName = req.params.shopName;
  let pageNumber = req.params.pageNumber;
  try {
    const products = await scrape(shopName, pageNumber);
    const responseObject = {
      status: 200,
      data: {
        productsNumber: products.length,
        shopName,
        time: Date.now(),
        products,
      },
    };
    res.json(responseObject);
  } catch (err) {}
};
