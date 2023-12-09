const express = require("express");
const { isAuthticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, updateOrder, deleteMyOrder, getAllOrders } = require("../controllers/orderController");
const { getSingleUser } = require("../controllers/userControl");
const router = express.Router();


router.route("/order/new").post(isAuthticatedUser, newOrder);

router.route("/order/:id").get(isAuthticatedUser, getSingleOrder);

router.route("order/me").get(isAuthticatedUser, myOrders);

router.route("/admin/order/:id").put(isAuthticatedUser, authorizeRoles("admin"), updateOrder);

router.route("/admin/order").get(isAuthticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/deleteorder").delete(isAuthticatedUser, authorizeRoles("admin"), deleteMyOrder);

module.exports = router;