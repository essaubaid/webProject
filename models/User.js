const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const UserSchema = new mongoose.Schema({

    username : { type: String, require: true, unique:true},
    email: {type: String, require: true, unique: true },
    password: {type: String, require: true },
    f_name: {type: String, require: true},
    l_name: {type: String, require: true},
    phone_number: {type: Object, properties: {
        areaCode:{type: String, pattern: "^[+][0-9]*$",minlength:3, maxlength:4},
        number:{type:String, pattern: "^[0-9]$", minlength:10, maxlength:10},
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
}, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);