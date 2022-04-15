import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    // orderItems: {
    //     name: { type: String, required: true },
    //     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    // },
    createdAt: { type: Date, required: true },
    isDelivered: { type: Boolean, required: true },
    confirmation: { type: Boolean, default: false },
    alreadyReported: { type: Boolean, default: false, required: true },
    typeReport: { type: String, required: true }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;