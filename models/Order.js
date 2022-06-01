const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User", required: true
    },
    username: { type: String, required: true },
    OrderDetails: {
        type: Array, items: [
            {
                type: Object, properties: {
                    product: { type: Object },
                    quantity: { type: Number, required: true },
                    price: { type: Number },
                    size: { type: String },
                    color: { type: String },
                },
            }
        ],
    },
    shipping_address: { type: Object, required: true },
    orderStatus: { type: String, enum: ["Received", "Accepted", "Shipped", "Delivered"], default: "Received", required: true },
    grossTotal: { type: Number, required: true },
}, { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);