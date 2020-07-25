const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from API");
});

router.use("/users", require("./users"));
router.use("/lists", require("./lists"));

module.exports = router;
