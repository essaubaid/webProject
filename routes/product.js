const Product = require("../models/Product");
const {verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

router.post("/createProduct/:id", verifyTokenAndAdmin, async(req, res)=>{
    const newProduct = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        stock: req.body.stock,
        productBrand: req.body.productBrand,
        productCategory: req.body.productCategory
    });

    try{
        const savedProduct = await newProduct.save();
        res.status(210).json(savedProduct);
    }
    catch(err){
        res.status(510).json(err);
    }
});

router.get("/getAllProducts", async(req, res)=>{
    try{
        const allProducts = await Product.find({});
        const MapProducts = [];

        allProducts.forEach(element => {
            MapProducts.push(element);
        });
        res.status(211).json(MapProducts);
    }
    catch(err){
        res.status(511).json(err);
    }
});

router.put("/updateProduct/:id/:productID", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, {
            $set: req.body
        }, {new:true});

        res.status(212).json(updatedProduct);
    }
    catch(err){
        res.status(512).json(err);
    }
});



module.exports = router;