const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const { uploadFile, deleteFile } = require('./S3')
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

router.put("/updateProduct/:id/:productID", verifyTokenAndAdmin, upload.single('productImage'), async (req, res) => {
    try {
        const currentProduct = await Product.findById(req.params.productID);

        if (req.file) {
            if (currentProduct) {
                deleteFile(currentProduct.productImageURL);
                const file = req.file
                const result = await uploadFile(file)
                await unlinkFile(file.path)

                const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, {
                    productName: req.body.productName,
                    productPrice: req.body.productPrice,
                    stock: req.body.stock,
                    productBrand: req.body.productBrand,
                    productCategory: req.body.productCategory,
                    color: req.body.color,
                    size: req.body.size,
                    productImageURL: result.Key,
                }, { new: true });

                res.status(212).json(updatedProduct);
            }
            else {
                res.status(212).json(err);
            }
        }
        else {
            if (currentProduct) {
                const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, {
                    productName: req.body.productName,
                    productPrice: req.body.productPrice,
                    stock: req.body.stock,
                    productBrand: req.body.productBrand,
                    productCategory: req.body.productCategory,
                    color: req.body.color,
                    size: req.body.size,
                }, { new: true });

                res.status(212).json(updatedProduct);
            }
            else {
                res.status(212).json("no such product exists");
            }
        }
    }
    catch (err) {
        res.status(512).json("yes its here");
    }
});

router.delete("/deleteProduct/:id/:productID", verifyTokenAndAdmin, async (req, res) => {
    try {
        const Products = await Product.findById(req.params.productID);
        if (Products) {

            deleteFile(Products.productImageURL);
            await Product.findByIdAndRemove(req.params.productID);

            res.status(212).json("product deleted");
        }
        else {
            res.status(212).json("no such product exists");
        }
    }
    catch (err) {
        res.status(512).json(err);
    }
});

router.post("/test", upload.single('productImage'), async (req, res) => {
    try {
        if (req.file) {
            console.log("file was sent")
        }
        else {
            console.log("file not sent")
        }
        res.status(211).json("ok");
    }
    catch (err) {
        res.status(511).json("err");
    }
});


module.exports = router;