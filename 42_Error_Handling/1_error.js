const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "zaza") {
    next();
  } else if (password) {
    throw new Error("Wrong Password");
    // we get " Error: Wrong Password " in the browser
  } else {
    throw new Error("Password is required");
    // we get " Error: Password is required " in the browser
  }
};

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("Secret Page :)");
});

app.get("/error2", (req, res) => {
  errorFly();
});

// custom error handling middleware
app.use((err, req, res, next) => {
  console.log("***************************************");
  console.log("Something went wrong");
  console.log(err);
  console.log("***************************************");
  res.status(500).send("Something went wrong");
  // we get " Something went wrong " in the browser
  // next(err); -> default way to handle errors
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
