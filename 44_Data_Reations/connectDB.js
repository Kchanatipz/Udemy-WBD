const mongoose = require("mongoose");

module.exports.connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1/relationDB")
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("Mongo connection error");
      console.log(err);
    });
};
