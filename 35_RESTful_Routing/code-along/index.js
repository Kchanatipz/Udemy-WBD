const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parsing from HTML form
app.use(bodyParser.urlencoded({ extended: true }));
// parsing from JSON format
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h3>Home page</h3>");
});

app.get("/order", (req, res) => {
  res.send("<h3>GET order page</h3>");
});

app.post("/order", (req, res) => {
  //   console.log(req.body);
  const { food, qty } = req.body;
  res.send(
    `<h3>Form submitted. ${qty} ${food}${qty > 1 ? "s are" : " is"} sent</h3>`
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
