const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const productRouter = require("./routes/productRoute");
app = express();
// 1) Middleware
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//Routes
app.use("/api/v1/products", productRouter);

module.exports = app;
