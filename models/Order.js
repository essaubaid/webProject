const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new mongoose.Schema({
    userID: {type: Schema.Types.ObjectId,
    ref:"User", required: true},
    OrderDetails: {type: Array, items:[
        {type:Object, properties:{
                productID: {type: Schema.Types.ObjectId,
                ref:"Product", required: true},
                quantity: {type: Number, required: true},
                price:{type: Number, required: true}
                },
            }
        ],
    },
    shipping_address:{type: Object, properties:{
        street_address: {type: String, maxlength:100},
        city: {type: String, maxlength: 20},
        country: {type:String, maxlength:20},
        },
        additionalProperties: false,
    },
    orderStatus: {type:String, enum:["Received", "Accepted", "Shipped", "Delivered"], default:"Received", required: true},
    grossTotal: {type: Number, required: true},
}, {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);