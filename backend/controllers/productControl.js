const Product = require("../models/productmodal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasynerror");
const Apifeatures = require("../utils/apifeature");

// Create Product 
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

exports.getallproduct = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocumnets();
    const apiFeatures = new Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products
    })
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
        productCount,

    });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "product delete"
    });

});

