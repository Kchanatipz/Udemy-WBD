const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("./product");

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  city: {
    type: String,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// when findByIdAndDelete method is called
// it triggers findOneAndDelete (query) middleware
// query middleware supports model and query function
// farm from await Farm.findByIdAndDelete(id);
farmSchema.post("findOneAndDelete", async (farm) => {
  console.log("Post delete");
  console.log(farm);
  if (farm.products.length) {
    const res = await Product.deleteMany({ _id: { $in: farm.products } });
    console.log(res);
  }
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
