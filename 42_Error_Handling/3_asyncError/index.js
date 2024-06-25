const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const AppError = require("../AppError");

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

// async error handling
// use try catch to handle errors
// For errors returned from asynchronous functions
// pass them to the next() function
// where Express will catch and process them.
// also use return to stop the execution
app.get("/products", async (req, res, next) => {
  try {
    let cate = req.query.category;
    let products;
    if (!cate) {
      products = await Product.find({});
      cate = "All";
    } else {
      products = await Product.find({ category: cate });
    }
    res.render("products/index", { products, category: cate });
  } catch (err) {
    next(err);
  }
});

app.get("/products/new", async (req, res) => {
  res.render("products/new", { categories });
});

// wrapAsync function
// to handle async errors
// return function that takes req, res, next
// and calls fn with req, res, next
// and catches any errors that occur
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
  })
);

app.get("/products/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError(404, "Product Not Found!"));
    }
    res.render("products/details", { product });
  } catch (err) {
    next(err);
  }
});

app.get("/products/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError(404, "Product Not Found!"));
    }
    res.render("products/edit", { product, categories });
  } catch (err) {
    next(err);
  }
});

app.put("/products/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    res.redirect(`/products/${product._id}`);
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (err) {
    next(err);
  }
});

// desc   home page
// route  GET localhost:3000
app.get("/", (req, res) => {
  res.send("<h2>Home page</h2>");
});

const handleValidationErr = (err) => {
  console.dir(err);
  return new AppError(400, `Validation Failed... ${err.message}`);
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
