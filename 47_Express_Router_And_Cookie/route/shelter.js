const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("View all shelters");
});

router.get("/:id", async (req, res) => {
  res.send("View a shelter");
});

router.get("/:id/edit", async (req, res) => {
  res.send("Edit s shelter");
});

module.exports = router;
