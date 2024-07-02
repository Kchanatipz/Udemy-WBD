const express = require("express");
const session = require("express-session");
// temporary store data on server side
// by default memory store is just in local memory
// not what session always do

const sessionConfig = {
  secret: "NotQuiteASecret",
  resave: false,
  saveUninitialized: false,
};
const app = express();

app.use(session(sessionConfig));
// session middleware send connect.sid cookie

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  if (!req.session.username) {
    req.session.username = "Unknown";
  }
  res.send(
    `<h2>${req.session.username} have viewed this page ${req.session.count} times</h2>`
  );
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  if (!req.session.username) {
    req.session.username = "Unknown";
  }
  res.send(`<h2>Hi there, ${req.session.username}!</h2>`);
});

app.get("/", (req, res) => {
  res.send("<h2>Home page</h2>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
