const mongoose = require("mongoose");
const { connectDB } = require("./connectDB");

connectDB();

// one to few model
// small data approach
// use an array to store data
const userSchema = new mongoose.Schema({
  name: String,
  addresses: [
    {
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const s = new User({
    name: "Happy",
    addresses: {},
  });
  s.addresses.push({
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await s.save();
  console.log(res);
};

// makeUser();
const addAddress = async (id) => {
  const user = await User.findById(id);

  user.addresses.push({
    city: "",
    state: "",
    country: "",
  });

  const res = await user.save();
  console.log(res);
};

addAddress("667d0981434db78de7dd8df4");
