const mongoose = require("mongoose");
const Product = require("./models/product");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1/productDB")
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("Mongo connection error");
      console.log(err);
    });
};

module.exports = connectDB;

// const p = new Product({
//   name: "Apple",
//   price: 1.99,
//   category: "fruit",
// });

// p.save()
//   .then(() => {
//     console.log("Product saved");
//     console.log(p);
//   })
//   .catch((err) => {
//     console.log("Product save error");
//     console.log(err);
//   });

// const products = [
//   {
//     name: "Grapefruit",
//     price: 1.99,
//     category: "fruit",
//   },
//   {
//     name: "Spinach",
//     price: 2.99,
//     category: "vegetable",
//   },
//   {
//     name: "Milk",
//     price: 2.5,
//     category: "dairy",
//   },
//   {
//     name: "Yogurt",
//     price: 3.5,
//     category: "dairy",
//   },
//   {
//     name: "Cucumber",
//     price: 0.99,
//     category: "vegetable",
//   },
//   {
//     name: "Carrot",
//     price: 0.49,
//     category: "vegetable",
//   },
//   {
//     name: "Orange",
//     price: 1.49,
//     category: "fruit",
//   },
//   {
//     name: "Cheese",
//     price: 4.99,
//     category: "dairy",
//   },
// ];

// Product.insertMany(products)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
