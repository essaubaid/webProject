const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const { uploadFile } = require('./S3')
const { unlinkFile } = require('./imageProcessing')

/* Import Multer */
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();

router.post("/createProduct/:id", verifyTokenAndAdmin,
    upload.single('productImage'), async (req, res) => {

        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        const newProduct = new Product({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            stock: req.body.stock,
            productBrand: req.body.productBrand,
            productCategory: req.body.productCategory,
            color: req.body.color,
            size: req.body.size,
            productImageURL: result.Key,
        });

        try {
            const savedProduct = await newProduct.save();
            res.status(210).json(savedProduct);
            //res.status(210).json(newProduct);
        }
        catch (err) {
            res.status(510).json(err);
        }
    });

router.get("/getAllProducts", async (req, res) => {
    try {
        const allProducts = await Product.find(req.body);
        const MapProducts = [];

        allProducts.forEach(element => {
            MapProducts.push(element);
        });
        res.status(211).json(MapProducts);
    }
    catch (err) {
        res.status(511).json(err);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const Products = await Product.findById(req.params.id);

        res.status(211).json(Products);
    }
    catch (err) {
        res.status(511).json(err);
    }
});

router.put("/updateProduct/:id/:productID", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, {
            $set: req.body
        }, { new: true });

        res.status(212).json(updatedProduct);
    }
    catch (err) {
        res.status(512).json(err);
    }
});



module.exports = router;