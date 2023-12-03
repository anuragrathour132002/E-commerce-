const express = require("express");
const { getallproduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControl");
const { isAuthticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthticatedUser, getallproduct);
router.route("/product/new").post(isAuthticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthticatedUser, authorizeRoles("admin"), deleteProduct).get(getProductDetails)


module.exports = router
