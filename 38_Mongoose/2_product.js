const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/shopDB")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

// mongoose schema validation
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // name is required
  },
  price: {
    type: Number,
    min: [0, "Price must be positive!"],
    // price must be positive
    // throw "Price must be positive!" if price is negative
  },
  onSale: {
    type: Boolean,
    default: false, // default value is false
  },
  categories: [String], // array of strings
  qty: {
    // nested object
    online: {
      type: Number,
      default: 0,
    },
    store: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    // size must be one of the enum values
  },
});

// model instance methods
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

// add static methods to model
// this refers to the model
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const bike = new Product({
  name: "Mountain Bike",
  price: 599.99,
  onSale: true,
  color: "Red",
  // color is not defined in schema
  // so mongoose will ignore this field
});

const helmet = new Product({
  name: "Helmet",
  price: 19.99,
  categories: ["Cycling", "Safety", 123],
  // mongoose will cast 123 to string
});

bike
  .save()
  .then((data) => {
    console.log("Bike saved to DB");
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

helmet
  .save()
  .then((data) => {
    console.log("Helmet saved to DB");
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

Product.findOneAndUpdate(
  { name: "Helmet" },
  { price: 9.99 },
  { new: true, runValidators: true }
  // new: true - return updated document
  // runValidators: true - run schema validations again
);

const findProduct = async () => {
  const foundProduct = Product.find({ name: "Helmet" });
  console.log(foundProduct);

  await foundProduct.toggleOnSale();
  console.log(foundProduct);

  await foundProduct.addCategory("Biking");
  console.log(foundProduct);
};

findProduct();

Product.fireSale().then((res) => console.log(res));
