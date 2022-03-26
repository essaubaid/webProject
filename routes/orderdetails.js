const OrderDetails = require("../models/OrderDetails");
const Product = require("../models/Product");
const {verifyTokenAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

router.post("/addToOrder/:id", verifyTokenAuthorization, async(req, res)=>{
    const newOrderDetails = new OrderDetails({
        productID: req.body.productID,
        quantity: req.body.quantity
    });

    const findPrice = async() =>{
        const currentProduct = await Product.findById(newOrderDetails.productID);
        newOrderDetails.price = currentProduct.productPrice * newOrderDetails.quantity;
    };

    await findPrice();

    try{
        //const savedOrderDetail = await newOrderDetails.save();
        res.status(212).json(newOrderDetails);
    }
    catch(err){
        res.status(512).json(err);
    }
});

module.exports = router;