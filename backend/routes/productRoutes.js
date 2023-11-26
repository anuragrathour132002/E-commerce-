const express = require("express");
const { getallproduct, createProduct } = require("../controllers/productControl");

const router = express.Router();

router.route("/products").get(getallproduct);
router.route("/product/new").post(createProduct);

module.exports = router
