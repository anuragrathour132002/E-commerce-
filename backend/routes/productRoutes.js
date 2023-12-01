const express = require("express");
const { getallproduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControl");
const { isAuthticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthticatedUser, getallproduct);
router.route("/product/new").post(isAuthticatedUser, createProduct);
router.route("/product/:id").put(isAuthticatedUser, updateProduct).delete(isAuthticatedUser, deleteProduct).get(getProductDetails)


module.exports = router
