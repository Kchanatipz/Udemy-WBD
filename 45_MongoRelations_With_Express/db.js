const mongoose = require("mongoose");
const Product = require("./models/product");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1/productDB2")
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("Mongo connection error");
      console.log(err);
    });
};

module.exports = connectDB;
