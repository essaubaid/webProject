const Brand = require("../models/Brand");
const { verfiyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post("/create/:id", verifyTokenAndAdmin, async (req, res)=>{
    const newBrand = new Brand({
        brandName: req.body.brandName,
    });
    try{
        const savedBrand = await newBrand.save();
        res.status(206).json(savedBrand);
    }
    catch(err){
        res.status(505).json(err);
    }
});

router.get("/getBrands", async (req, res)=>{
    try{
        const allBrands = await Brand.find({});
        const userMap = [];
        allBrands.forEach((allBrands) => {
            userMap.push(allBrands.brandName);
        });

        res.status(205).json(userMap);
    }
    catch(err){
        res.status(505).json(err);
    }

});

router.put("/updateBrand/:id/:brandID", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const updatedBrand = await Brand.findByIdAndUpdate(req.params.brandID, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedBrand);
    }
    catch(err){
        res.status(404).json(err);
    }
});

module.exports = router;