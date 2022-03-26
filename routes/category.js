const Category = require("../models/Category");
const {verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

router.post("/createCategory/:id", verifyTokenAndAdmin, async (req, res)=>{
    const newCategory = new Category({
        categoryname: req.body.categoryname,
        categorydescription: req.body.categorydescription,
        parentcategory: req.body.parentcategory
    });

    try{
        const savedCategory = await newCategory.save();
        res.status(206).json(savedCategory);
    }
    catch(err){
        res.status(506).json(err);
    }
});

router.get("/getCategories", async(req, res)=>{
    const allCategories = await Category.find({});

    const MapCategories = [];

    allCategories.forEach(element => {
        MapCategories.push(element);
    });

    try{
        res.status(207).json(MapCategories);
    }
    catch(err){
        res.status(507).json(err);
    }
});

router.put("/updateCategory/:id/:CategoryID", verifyTokenAndAdmin, async(req, res)=>{

    try{
        const updatedCategory = await Category.findByIdAndUpdate(req.params.CategoryID, {
            $set: req.body
        }, {new:true});
    
        res.status(208).json(updatedCategory);
    }
    catch(err){
        res.status(508).json(err);
    }

});

module.exports = router;