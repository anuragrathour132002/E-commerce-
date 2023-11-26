const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the product name"],
        trim: true
    },
    decsription: {
        type: String,
        required: [true, "Pleae enter the description"]
    },
    price: {
        type: Number,
        required: [true, "Pleae Enter the price of product"],
        maxLength: [8, "Price cannot exceed 8 character"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        }
    ],
    category: {
        type: String,
        required: [true, "Pleae enter product catogery"]
    },
    Stock: {
        type: Number,
        required: [true, "Pleae enter the product stock"],
        maxlength: [4, "Stock can not exceed 4 character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }

        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.modelNames("Product", productSchema);

