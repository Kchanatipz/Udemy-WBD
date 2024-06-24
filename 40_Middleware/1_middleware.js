const express = require("express");
const morgan = require("morgan");

const app = express();

// print out details about requests
// ex
// GET / 304 0.781 ms - -
// GET /about 304 0.374 ms - -
// GET /contact 200 1.456 ms - 12
// GET /services 200 3.704 ms - 13
app.use(morgan("dev"));

// runs for every request
// next() is used to move to the next middleware
app.use((req, res, next) => {
  console.log("HI I am a middleware");
  next();
  console.log("I am after next() from middleware");
});

app.use((req, res, next) => {
  console.log("HI I am a middleware 2");
  next();
  console.log("I am after next() from middleware 2");
});

app.use((req, res, next) => {
  console.log("HI I am a middleware 3");
  return next();
  console.log("I am after next() from middleware 3");
});

// middleware for path /about only
app.use("/about", (req, res, next) => {
  console.log("I am only for /about path");
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.get("/services", (req, res) => {
  res.send("Services Page");
});

// last middleware (not found page)
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
