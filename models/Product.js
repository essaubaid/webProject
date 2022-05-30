const mongoose = require("mongoose");
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({

    productName: { type: String, required: true, unique: true },
    productPrice: { type: Number, required: true },
    stock: { type: String, enum: ["Available", "OutOfStock"], required: true },
    productImageURL: { type: String },
    productBrand: {
        type: Schema.Types.ObjectId,
        ref: "Brand", required: true
    },
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category", required: true
    },
    color: {
        type: Array, items: [
            { type: String, unique: true }
        ]
    },
    size: {
        type: Array, items: [
            { type: String, unique: true }
        ]
    }

}, { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);