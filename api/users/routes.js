const controllers = require("./controllers.js");
const express = require("express");
const withAuth = require("../middleware.js");

const router = express.Router();

router.post("/register", controllers.register);
router.post("/authenticate", controllers.authenticate);
router.put("/", withAuth, controllers.updateUser);
router.delete("/", withAuth, controllers.deleteUser);
router.get("/checkToken", withAuth, controllers.checkToken);

module.exports = router;