const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControl");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

module.exposts = router;