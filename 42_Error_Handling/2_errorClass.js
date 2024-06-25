const express = require("express");
const morgan = require("morgan");
const AppError = require("./AppError");

const app = express();

app.use(morgan("dev"));

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "zaza") {
    next();
  } else if (password) {
    throw new AppError(401, "Wrong Password");
  } else {
    throw new AppError(401, "Password is required");
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

app.get("/admin", (req, res) => {
  throw new AppError(403, "You are not an admin");
});

// custom error handling middleware
app.use((err, req, res, next) => {
  // destructure status and message from err object (AppError class)
  // default values are 500 and "Something went wrong"
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
