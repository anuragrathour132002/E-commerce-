const Order = require("../models/ordermodal");
const Product = require("../models/productmodal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchasynerror");
const e = require("express");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderInfo, paymentInfo, itemsPrice, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo, orderInfo, paymentInfo, itemsPrice, itemPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// get loginin  orders

exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});


exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let TotalAmount = 0;
    orders.gorEach(order => {
        TotalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        TotalAmount,
        orders,
    });
});



exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered this order", 400));
    }

    order.orderItems.forEach(async (o) => {
        await updateStock(o.Product, o.quantity);
    })

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validationBeforeSave: false });
    res.status(200).json({
        success: true,

    });
});


async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validationBeforeSave: false });
}

exports.deleteMyOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params._id);


    if (!order) {
        return next(new ErrorHandler("order is not found with this id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });

});