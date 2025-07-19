const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  getMe
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);


module.exports = router;
