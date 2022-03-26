const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderDetailsSchema = new mongoose.Schema({
    productID: {type: Schema.Types.ObjectId,
    ref:"Product", required: true},
    quantity: {type: Number, required: true},
    price:{type: Number, required: true}
}, {timestamps: true}
);

module.exports = mongoose.model("OrderDetails", OrderDetailsSchema);