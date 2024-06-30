const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");

const connectDB = require("./db");
connectDB();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["Fruit", "Vegetable", "Dairy", "Meat", "Grain"];

// Farm Routes
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get("/farms/:id", async (req, res) => {
  const id = req.params.id;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/details", { farm });
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

// cascade delete
app.delete("/farms/:id", async (req, res) => {
  const id = req.params.id;
  const farm = await Farm.findByIdAndDelete(id);

  res.redirect("/farms");
});

app.get("/farms/:id/products/new", async (req, res) => {
  const id = req.params.id;
  const farm = await Farm.findById(id);
  res.render("farms/newProduct", { categories, farm });
});

app.post("/farms/:id/products", async (req, res) => {
  const product = new Product(req.body);
  const id = req.params.id;
  const farm = await Farm.findById(id);
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${farm._id}`);
});

// Product Routes
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

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/products/${product._id}`);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("farm");
  res.render("products/details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.get("/", (req, res) => {
  res.send("<h2>Home page</h2>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
