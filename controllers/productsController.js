const fs = require("fs");
const Product = require("../model/productModel");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products: products,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // Product.findOne({_id: req.params.id})

    res.status(201).json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(202).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    console.log("Error creating product: ", err.message);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(203).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    console.log("Error updating product: ", err.message);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    console.log("Error deleting product: ", err.message);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
