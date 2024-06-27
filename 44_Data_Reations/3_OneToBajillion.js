const mongoose = require("mongoose");
const { Schema } = mongoose;
const { connectDB } = require("./connectDB");

connectDB();

// one to bajillions
// huge data approach
// instead of storing references to child field on parent field
// use a reference to the parent field on each child field
const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeData = async () => {
  await User.deleteMany({});
  await Tweet.deleteMany({});

  const u1 = new User({ username: "chickenfan99", age: 61 });
  const u2 = new User({ username: "iluvdogz33", age: 16 });

  const t1 = new Tweet({ text: "omg I love my chicken family", likes: 67 });
  const t2 = new Tweet({ text: "bok bok bok", likes: 10 });
  const t3 = new Tweet({ text: "I'm getting hungry", likes: 4 });

  t1.user = u1;
  t2.user = u2;
  t3.user = u1;

  await u1.save();
  await u2.save();
  await t1.save();
  await t2.save();
  await t3.save();

  console.log("Data made");
};

const showUsers = async () => {
  const users = await User.find({});
  console.log("Showing users");
  console.log(users);
};

const showTweets = async () => {
  const tweets = await Tweet.find({});
  console.log("Showing tweets");
  console.log(tweets);
};

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

// makeData();
// showUsers();
// showTweets();
findTweet();
