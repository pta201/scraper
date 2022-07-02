const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const productRouter = require("./routes/productRoute");
app = express();
// 1) Middleware
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//Routes
app.use("/api/v1/products", productRouter);

module.exports = app;
