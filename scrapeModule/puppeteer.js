const puppeteer = require("puppeteer");
const { getProductsData } = require("./product/product");

const wsChromeEndpointurl =
  "ws://127.0.0.1:9222/devtools/browser/c30fd762-13b9-4f0f-860a-fdf30e768308";

const scrape = (shopName = "babykoi2014", pageNum = 1) => {
  return new Promise((resolve, reject) => {
    let products = [];
    const browser = puppeteer
      .launch({
        browserWSEndpoint: wsChromeEndpointurl,
        headless: true,
        args: ["--no-sandbox"],
      })
      .then(async (browser) => {
        for (let i = 0; i < pageNum; i++) {
          const page = await browser.newPage();
          let url = `https://shopee.vn/${shopName}?page=${i}&sortBy=sales`;
          await page.goto(url, { waitUntil: "networkidle0" });
          console.log(url);
          await scrollToBottom(page);

          const html = await page.content();

          // Lấy thông tin các sp trên trang
          try {
            products.push(await getProductsData(html));
          } catch (e) {
            console.log("Lỗi rồi: ", e);
          }
        }
        resolve(products);
        reject([]);
      });
    browser.close();
  });
};
async function scrollToBottom(page) {
  const distance = 700; // should be less than or equal to window.innerHeight
  const delay = 400;
  while (
    await page.evaluate(
      () =>
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
    )
  ) {
    await page.evaluate((y) => {
      document.scrollingElement.scrollBy(0, y);
    }, distance);
    await page.waitForTimeout(delay);
  }
}

module.exports.scrape = scrape;
