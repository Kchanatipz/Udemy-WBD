const express = require("express");
const app = express();
const path = require("path");

// fake reddit data
const redditData = require("./data.json");

// set static assets and its directory
app.use(express.static(path.join(__dirname, "public")));

// config ejs in express
app.set("view engine", "ejs");

// set views directory
app.set("views", path.join(__dirname, "/views"));

// home page
app.get("/", (req, res) => {
  res.render("home");
});

// random number page
app.get("/random", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { num });
});

// cats page
app.get("/cats", (req, res) => {
  const cats = ["Ethan", "Elza", "Elizabeth", "Eddie", "Edmun"];
  res.render("cats", { cats });
});

// subreddit page
app.get("/reddit/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("err", { subreddit });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
