const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const Farm = require("./models/farm");

const connectDB = require("./db");
connectDB();

const app = express();

app.use(flash());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
// Flash messages are stored in the session
// so we have to use session middleware before flash
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);

// middleware to pass flash messages to all templates
// access to them through res.locals
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  // looking for flash "success" key message
  res.render("farms/index", { farms, messages: req.flash("success") });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get("/farms/:id", async (req, res) => {
  const id = req.params.id;
  const farm = await Farm.findById(id);
  res.render("farms/details", { farm });
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  // req.flash() : key is success
  req.flash("success", "Successfully made new farm!");
  res.redirect("/farms");
});

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

app.get("/", (req, res) => {
  res.send("<h2>Home page</h2>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
