const express = require("express");
const { getallproduct } = require("../controllers/productControl");

const router = express.Router();

router.route("/products").get(getallproduct);

module.exports = router
