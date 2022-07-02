const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });

const Product = require("../../model/productModel");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connected succesfully");
  });

// Read Json
const Products = fs.readFileSync(
  path.join(__dirname, "./products.json"),
  "utf-8"
);

const importData = async () => {
  try {
    await Product.create(JSON.parse(Products));
    console.log("Successfully imported");
  } catch (err) {
    console.log("error: " + err);
  } finally {
    process.exit();
  }
};

// Delete All Data from Collection
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Deleted All Documents");
  } catch (err) {
    console.log("Error: " + err);
  } finally {
    process.exit();
  }
};

console.log(process.argv);
if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteData();
}
