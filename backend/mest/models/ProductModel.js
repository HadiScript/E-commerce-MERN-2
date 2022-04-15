import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

    name: { type: String, },
    rating: { type: Number, },
    comment: { type: String, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true })



const commentSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, },
        name: { type: String },
        date: { type: Date, default: Date.now }
    }
)


const productSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    name: { type: String, },
    category: { type: String, },
    categoryName: { type: String, },
    description: { type: String, },
    modelVersion: { type: String, unique: true },

    supplier: { type: String, },
    supplierName: { type: String, },
    totalPay: { type: Number, },
    givePay: { type: Number, },

    // seperate schema which is small thatswhy we defined it here above
    // array of reviews
    reviews: [reviewSchema],
    comments: [commentSchema],


    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
    shipping: {
        type: String,
        enum: ["Yes", "No"],
    },
    keyMarket: {
        type: String,
        enum: ["New", "Trend", "Latest"],
    },
    brand: {
        type: String,
    },
    brandName: { type: String },

    images: {
        type: Array,
    },

}, { timestamps: true }
)

const Product = mongoose.model('Product', productSchema);

export default Product