const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema({

    userID : { type: Schema.Types.ObjectId, ref: "User", required: true},
    productID: { type: Schema.Types.ObjectId, ref: "Product", required: true},
    rating: { type: String, pattern: "^[1-5]$", maxlength:1, required: true },
    description: { type: String, maxlength: 1000}   
}, 
{timestamps: true}
);

module.exports = mongoose.model("Review", ReviewSchema);