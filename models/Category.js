const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({

    categoryname : { type: String, required: true, unique:true },
    categorydescription : { type: String, required: true },
    parentcategory: { type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    
}, 
{timestamps: true}
);

module.exports = mongoose.model("Category", CategorySchema);