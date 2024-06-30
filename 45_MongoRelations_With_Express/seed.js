const Product = require("./models/product");
const Farm = require("./models/farm");
const mongoose = require("mongoose");

module.exports.makeData = async () => {
  await Product.deleteMany({});
};
