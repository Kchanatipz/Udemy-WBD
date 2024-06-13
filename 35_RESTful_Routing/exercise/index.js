const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: generateID } = require("uuid");
const methodOverride = require("method-override");

let comments = require("./comments");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// need to override method POST
// since HTML form can't send PATCH and DELETE request
app.use(methodOverride("_method"));

// desc     display all comments
// route    GET /comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// desc     give comment form
// route    GET /comments/new
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// desc     create new comment
// route    POST /comments
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username: username, comment: comment, id: generateID() });
  res.redirect("/comments");
  // redirect users to comments page (GET request)
});

// desc     display single comment
// route    GET /comments/:id
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

// desc     update comment
// route    PATCH /comments/:id
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const new_comment = req.body.comment;
  const c = comments.find((c) => c.id === id);
  c.comment = new_comment;
  res.redirect("/comments");
});

// desc   update comment form
// route  GET /comments/:id/edit
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const c = comments.find((c) => c.id === id);
  res.render("comments/edit", { c });
});

// desc     delete comment
// route    DELETE /comments/:id
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
