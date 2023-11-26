const Product = require("../models/productmodal");


// Create Product 
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getallproduct = (req, res) => {
    res.status(200).json({ message: "routes is working" });
}