const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const UserSchema = new mongoose.Schema({

    username : { type: String, required: true, unique:true},
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    f_name: {type: String, pattern: "^[+][0-9]*$", required: true},
    l_name: {type: String, required: true},
    phone_number: {type: Object, properties: {
        areaCode:{type: String, pattern: "^[+][0-9]*$",minLength:3, maxLength:4},
        number:{type:String, pattern: "^[0-9]$", minLength:10, maxLength:10},
        },
        required:["areaCode", "number"], additionalProperties: false,
    },
    billing_address:{type: Object, properties:{
        street_address: {type: String, maxlength:100},
        city: {type: String, maxlength: 20},
        country: {type:String, maxlength:20},
        },
        additionalProperties: false,
    },
    shipping_address:{type: Object, properties:{
        street_address: {type: String, maxlength:100},
        city: {type: String, maxlength: 20},
        country: {type:String, maxlength:20},
        },
        additionalProperties: false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER",
    },
    token: {
        type:String,
    },
}, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);