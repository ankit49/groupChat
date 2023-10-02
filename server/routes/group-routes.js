const express = require("express");
const {
  createGroup,
  deleteGroup,
  updateGroupData,
  updateGroupMessage,
  addLike,
  removeLike,
} = require("../controllers/group-controller");
const router = express.Router();

router.route("/create").post(createGroup);
router.route("/update").post(updateGroupData);
router.route("/delete").post(deleteGroup);
router.route("/addMessage").post(updateGroupMessage);
router.route("/addLike").post(addLike);
router.route("/removeLike").post(removeLike);

module.exports = router;
