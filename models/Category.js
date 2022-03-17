const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    CategoryName : { type: String, require: true, unique:true},
    
}, 
{timestamps: true}
);

module.exports = mongoose.model("Category", UserSchema);