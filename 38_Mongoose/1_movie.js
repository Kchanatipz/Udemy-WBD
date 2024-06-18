const mongoose = require("mongoose");

// connecting mongoose to MongoDB
// - creates movieDB database
// - returns a promise
mongoose
  .connect("mongodb://127.0.0.1/movieDB")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  genre: String,
});

// mongoose.model(__ModelName__, schema)
// - create movies collection from "Movie" model
// - return class saved to const Movie
const Movie = mongoose.model("Movie", movieSchema);

const jack = new Movie({
  title: "Jack",
  year: 1988,
  score: 7.6,
  genre: "Horror",
});

// insertMany returns promise
Movie.insertMany([
  { title: "Transfomer", year: 2012, score: 8.7, genre: "Action" },
  { title: "Star Wars", year: 2021, score: 9.6, genre: "Sci-fi" },
  { title: "Jurassic Park", year: 2018, score: 6.3, genre: "Adventour" },
  { title: "The Avengers", year: 2010, score: 8.8, genre: "Action" },
])
  .then(() => {
    console.log("Saved from insertMany");
  })
  .catch((err) => {
    console.log(err);
  });

// find returns Mongoose query (not promise)
Movie.find({})
  .then((movie) => {
    // console.log("All movies are");
    console.log(movie);
    // console.log("----------------------------");
  })
  .catch((err) => {
    console.log(err);
  });

Movie.find({ genre: "Action" })
  .then((movie) => {
    // console.log("Movies with action genre are");
    console.log(movie);
    // console.log("----------------------------");
  })
  .catch((err) => {
    console.log(err);
  });

// Movie.deleteMany({})
//   .then(() => {
//     console.log("done!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
