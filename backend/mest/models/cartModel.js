const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
                price: Number,
            },
        ],
        cartTotal: Number,
        orderdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
