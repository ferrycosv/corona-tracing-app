const controllers = require("./controllers.js");
const contactController = require("./contactConroller")
const express = require("express");
const withAuth = require("../middleware.js");


const router = express.Router();

router.post("/register", controllers.register);
router.post("/authenticate", controllers.authenticate);
router.put("/", withAuth, controllers.updateUser);
router.delete("/", withAuth, controllers.deleteUser);
router.post("/checkToken", withAuth, controllers.checkToken);
router.post("/:userName/contacts",contactController.addContact);
router.get("/:userName/contacts",contactController.getContacts);
router.get("/:userName/contacts/:id",contactController.getContact);
router.put("/:userName/contacts/:id",contactController.updateContact);    
router.delete("/:userName/contacts/:id",contactController.deleteContact);
router.get("/:userName/contacts/:id/changeStatus",contactController.changeStatus);




module.exports = router;
