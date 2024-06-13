const express = require("express");

// execute express
const app = express();

// In every incoming requests, express makes 2 objects
// that automatically passes in to this callback
// call request and response
// app.use((req, res) => {
//   console.log("incoming rquest");
//   res.send("<h1>Home page<e/h1>");
// });
// this will response every incoming request

// request for localhost:3000
app.get("/", (req, res) => {
  console.log("incoming rquest");
  res.send("<h1>Home page<e/h1>");
});

// request for localhost:3000/cat
app.get("/cat", (req, res) => {
  res.send("<h1>Cat page</h1>");
});

// post request for localhost:3000/cat
app.post("/cat", (req, res) => {
  res.send("<h1>Post cat page</h1>");
});

// request for localhost:3000/dog
app.get("/dog", (req, res) => {
  res.send("<h1>Dog page</h1>");
});

// request for localhost:3000/reddit/...
app.get("/reddit/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>${subreddit} subreddit page</h1>`);
});

// request for localhost:3000/reddit/.../...
app.get("/reddit/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>${subreddit} subreddit page from ID ${postId}</h1>`);
});

// request for localhost:3000/search/?q=....
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.send(`<h1>Search <i>${q}</i> page </h1>`);
});

// request for all other localhost:3000/...
app.get("*", (req, res) => {
  res.send("<h1>Unknown page</h1>");
});

// listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
