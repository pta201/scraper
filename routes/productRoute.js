const express = require("express");
const productsControler = require("../controllers/productsController");
const scrapeControler = require("../controllers/scrapeController");

const router = express.Router();

router
  .route("/")
  .get(productsControler.getAllProduct)
  .post(productsControler.createProduct);
router
  .route("/:id")
  .get(productsControler.getProduct)
  .patch(productsControler.updateProduct)
  .delete(productsControler.deleteProduct);
router.route("/scrape/:shopName/:pageNumber").get(scrapeControler.scrape);
module.exports = router;
