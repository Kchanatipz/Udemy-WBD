const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmSchema = new Schema({
  name: String,
  city: String,
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
