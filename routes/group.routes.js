const express = require("express");
const router = express.Router();
const groupController = require("../controller/group.controller");


router.get("/groups", groupController.getAllGroups);
router.post("/groups", groupController.createGroup);


module.exports = router;


