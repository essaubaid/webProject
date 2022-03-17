const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    brandName : { type: String, require: true, unique:true},
}, 
{timestamps: true}
);

module.exports = mongoose.model("Brand", UserSchema);