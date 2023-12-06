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


exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.isString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.rating = product.reviews.forEach((rev) => {
        avg += rev.rating;
    })
    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("product not Found", 404));
    }
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.string());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const rating = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId, {
        reviews,
        rating,
        numOfReviews,
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        },
    );

    res.status(200).json({
        success: true,
    });


});


