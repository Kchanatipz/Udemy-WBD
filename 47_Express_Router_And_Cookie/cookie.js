const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("AllIWantIsChikyChicky"));
// "AllIWantIsChikyChicky" will be used
// by cookie parser to sign cookies

// Set a cookie using res.cookie
// set name to elza 123 and age to 25
// this cookie will be sayed in the browser
// and will be sent to the server with every request
app.get("/setname", (req, res) => {
  res.cookie("name", "elza 123");
  res.cookie("age", 25);
  res.send("Sent you a cookie");
});

// Get a cookie using req.cookies
// req.cookies is an object that contains
// all the cookies sent by the browser
app.get("/greet", (req, res) => {
  console.log(req.cookies);
  const { name = "No-name" } = req.cookies;
  res.send(`Hi, ${name}!`);
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "apple", { signed: true });
  // use { signed: true } to use cookie parser
  // we get s%3Aapple.KnL8EnB5F9Y2%2F7F87c0onHkss6P0ZRwiFYzyma5RQ%2BE
  res.send("OK");
});

app.get("/getunsignedcookie", (req, res) => {
  console.log(req.cookies); // won't get signed cookie
  console.log(req.signedCookies); // will get signed cookies
  // if fruit is unsigned data
  // we'll get nothing
  // if we change just s%3Aapple.KnL to s%3Abanana.KnL
  // we'll get {"fruit":false}
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
