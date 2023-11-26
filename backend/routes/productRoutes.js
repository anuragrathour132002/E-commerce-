const express = require("express");
const { getallproduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControl");

const router = express.Router();

router.route("/products").get(getallproduct);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)


module.exports = router
