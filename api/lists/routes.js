const controllers = require("./controllers.js");
const express = require("express");
const withAuth = require("../middleware.js");

const router = express.Router();

router.get("/", withAuth, controllers.getList);
router.put("/", withAuth, controllers.updateList);

module.exports = router;
