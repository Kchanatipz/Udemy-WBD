const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

// product model
const Product = require("./models/product");

// connectDB function
const connectDB = require("./db");
connectDB();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["Fruit", "Vegetable", "Dairy", "Meat", "Grain"];

// desc   show all products
// route  GET /products
// or
// deac   show products by category
// route  GET /products?category=...
app.get("/products", async (req, res) => {
  let cate = req.query.category;
  let products;
  if (!cate) {
    products = await Product.find({});
    cate = "All";
  } else {
    products = await Product.find({ category: cate });
  }
  res.render("products/index", { products, category: cate });
});

// desc   get creating product form
// route  GET /products/new
app.get("/products/new", async (req, res) => {
  res.render("products/new", { categories });
});

// desc   create new product
// route  POST /products
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/products/${product._id}`);
});

// desc   show product details
// route  GET /products/:id
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/details", { product });
});

// desc   get editing product form
// route  GET /products/:id/edit
app.get("/products/:id/edit", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

// desc   update product
// route  PUT /products/:id
app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  // console.log(product);
  res.redirect(`/products/${product._id}`);
});

// desc   delete product
// route  DELETE /products/:id
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// desc   home page
// route  GET localhost:3000
app.get("/", (req, res) => {
  res.send("<h2>Home page</h2>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
