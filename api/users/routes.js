const controllers = require("./controllers.js");
const express = require("express");
const withAuth = require("../middleware.js");

const router = express.Router();

router.post("/register", controllers.register);
router.post("/authenticate", controllers.authenticate);
router.put("/", withAuth, controllers.updateUser);
router.delete("/", withAuth, controllers.deleteUser);
router.post("/checkToken", withAuth, controllers.checkToken);
router.post("/:userName/contacts",controllers.addContact);
router.get("/:userName/contacts",controllers.getContacts);
router.get("/:userName/contacts/:id",controllers.getContact);
router.put("/:userName/contacts/:id",controllers.updateContact);



module.exports = router;
