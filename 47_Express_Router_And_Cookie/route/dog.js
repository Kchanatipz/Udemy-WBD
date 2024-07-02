const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("View all dogs");
});

router.get("/:id", async (req, res) => {
  res.send("View a dog");
});

router.get("/:id/edit", async (req, res) => {
  res.send("Edit a dog");
});

module.exports = router;
