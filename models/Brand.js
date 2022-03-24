const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const BrandSchema = new mongoose.Schema({

    brandName : { type: String, require: true, unique:true},
}, 
{timestamps: true}
);

module.exports = mongoose.model("Brand", BrandSchema);