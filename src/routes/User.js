const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  showAllUsers,
  deleteUsers,
  updateUser,
  checkAuth,
} = require("../controllers/user");
const { authCheck } = require("../middlewares/middlewares");
const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/show", authCheck, showAllUsers);
router.delete("/delete", authCheck, deleteUsers);
router.patch("/update", updateUser);
router.get("/checkauth", authCheck, checkAuth);
module.exports = router;
