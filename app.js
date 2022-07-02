const fs = require("fs");
const express = require("express");
var cors = require("cors");

const productRouter = require("./routes/productRoute");
app = express();
// 1) Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://scraper-ui.vercel.app"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//Routes
app.use("/api/v1/products", productRouter);

module.exports = app;
