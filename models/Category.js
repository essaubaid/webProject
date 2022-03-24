const mongoose = require('mongoose');
const User = require('./User');
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({

    categoryname : { type: String, require: true, unique:true },
    categorydescription : { type: String, require: true },
    parentcategory: { type: Array,
        items: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },

    
}, 
{timestamps: true}
);

module.exports = mongoose.model("Category", CategorySchema);