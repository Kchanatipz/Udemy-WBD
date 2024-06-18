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

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

// virtuals
// - not stored in database
// - computed properties
// - have getter(return value)
//   and setter(set value)
personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// middleware
// - pre, post hooks
// - run before or after a specific method
// - next is a function to call next middleware
// - pre("save") & post("save") runs before & after save

personSchema.pre("save", async function () {
  this.firstName = "Pre " + this.firstName;
  console.log("About to save");
});

personSchema.post("save", async function () {
  console.log("Just saved");
});

const Person = mongoose.model("Person", personSchema);
