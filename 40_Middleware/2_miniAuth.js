const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

// looking for password in query
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "zaza") {
    next();
  } else if (password) {
    res.send("Wrong Password");
  } else {
    res.send("Password is required");
  }
};

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// using middleware for /secret path
app.get("/secret", verifyPassword, (req, res) => {
  res.send("Secret Page :)");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
