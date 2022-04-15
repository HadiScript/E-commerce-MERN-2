import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // array 
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            // image: { type: String, required: true },
            price: { type: Number, required: true },

            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ],

    // object
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },

    paymentMethod: {
        type: String, rqeuried: true
    },

    // which is comes from apypals
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        emailAddress: { type: String },

    },
    totalItems: { type: Number },

    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },

    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    reported: { type: Boolean, default: false }

}, { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema);

export default Order