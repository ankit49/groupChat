const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  listUsers,
  getCurrentUser,
} = require("../controllers/auth-controller");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/addUser").post(registerUser);
router.route("/updateUser").post(updateUser);
router.route("/deleteUser").post(deleteUser);
router.route("/listUsers").get(listUsers);
router.route("/getCurrentUser").get(getCurrentUser);

module.exports = router;
