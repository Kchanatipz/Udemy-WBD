const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1/flashDB")
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("Mongo connection error");
      console.log(err);
    });
};

module.exports = connectDB;
