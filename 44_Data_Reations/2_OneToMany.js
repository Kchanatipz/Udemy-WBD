const mongoose = require("mongoose");
const { Schema } = mongoose;
const { connectDB } = require("./connectDB");

connectDB();

// one to many
// big data approach
// use array to store references to data (id)
// also use .populate() to get the actual data
// instead of just the id reference
const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

const makeProduct = async () => {
  await Product.deleteMany({});

  await Product.insertMany([
    { name: "Goddess Melon", price: 4.99, season: "Summer" },
    { name: "Sugar Baby Watermelon", price: 4.99, season: "Summer" },
    { name: "Asparagus", price: 3.99, season: "Spring" },
  ]);
};

const makeFarm = async () => {
  await Farm.deleteMany({});

  const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
  await farm.save();

  const melon = await Product.findOne({ name: "Goddess Melon" });
  farm.products.push(melon);
  await farm.save();
};

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  console.log(farm);

  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
};

// makeProduct();
// makeFarm();
// addProduct();

Farm.findOne({ name: "Full Belly Farms" })
  .populate("products")
  .then((farm) => console.log(farm));
