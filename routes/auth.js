const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const rateLimiter = require("express-rate-limit")({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "Too many request. Please try again after 15 minutes" },
});

router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
