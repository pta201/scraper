const express = require("express");

const scrapeControler = require("../controllers/scrapeController");

const router = express.Router();

router.route("/scrape/:shopName/:pageNumber").get(scrapeControler.scrape);
module.exports = router;
