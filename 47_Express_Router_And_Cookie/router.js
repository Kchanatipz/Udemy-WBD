const express = require("express");
const app = express();

const shelterRoutes = require("./route/shelter");
const dogRoutes = require("./route/dog");
const adminRoutes = require("./route/admin");

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
