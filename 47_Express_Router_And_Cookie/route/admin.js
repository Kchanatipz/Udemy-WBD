const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  } else {
    res.send("Not admin");
  }
});

router.get("/topsecret", async (req, res) => {
  res.send("Top secret");
});

router.get("/deleteall", async (req, res) => {
  res.send("Delete everything");
});

module.exports = router;
