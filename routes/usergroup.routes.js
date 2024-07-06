const express = require("express");
const {
  addUserToGroup,
  removeUserFromGroup,
  getCommonGroups,
} = require("../controller/usergroup.controller");
const router = express.Router();

router.post("/groups/addUser", addUserToGroup);
router.post("/groups/removeUser", removeUserFromGroup);
router.post("/groups/getCommonGroups", getCommonGroups);

module.exports = router;
