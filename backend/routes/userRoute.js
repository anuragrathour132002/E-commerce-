const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserdetail, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deletUser } = require("../controllers/userControl");
const router = express.Router();
const { isAuthticatedUser, authorizeRole } = require("../middleware/auth");


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthticatedUser, getUserdetail);

router.route("/password/update").put(isAuthticatedUser, updatePassword);

router.route("/me/update").put(isAuthticatedUser, updateProfile);

router.route("admin.users").get(isAuthticatedUser, authorizeRole("admin"), getAllUsers);

router.route("admin/user/:id").get(isAuthticatedUser, authorizeRole("admin"), getSingleUser).put(isAuthticatedUser, authorizeRole("admin"), updateUserRole).delete(isAuthticatedUser, authorizeRole("admin"), deletUser);

router.route("logout").get(logout);

module.exposts = router; 