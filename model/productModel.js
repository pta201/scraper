const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  itemId: { type: "Number", required: true },
  shopId: { type: "Number", required: true },
  name: {
    type: "String",
    trim: true,
    required: [true, "A product must have a name"],
  },
  salesPerMonth: { type: "Number", required: true, default: 0 },
  priceDate: [
    {
      timestamp: {
        type: "Number",
        required: true,
        default: Date.now(),
        unique: false,
      },
      priceRange: {
        priceMin: { type: "Number", required: true },
        priceMax: { type: "Number", required: true },
      },
    },
  ],
  totalSales: { type: "Number", default: 0 },

  imageLink: { type: "String", trim: true },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
