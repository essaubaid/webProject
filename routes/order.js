const Order = require("../models/Order");
const Product = require("../models/Product");
const {verifyTokenAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

router.post("/createOrder/:id", verifyTokenAuthorization, async(req, res)=>{
    const newOrder = new Order({
        userID: req.params.id,
        OrderDetails: req.body.OrderDetails,
        shipping_address: req.body.shipping_address
    });

    const findPrice = async(element) =>{
        const currentProduct = await Product.findById(element.productID);
        element.price = currentProduct.productPrice * element.quantity;
        return element.price;
    };
    

    // newOrder.OrderDetails.forEach(async (element, index) => {
    //     const price = await findPrice(element);
    //     newOrder.OrderDetails[index].price = price;
    //     console.log("old");
    // });
    
    let grossTotal = 0;
    for(index = 0; index < newOrder.OrderDetails.length; index++){
        const price = await findPrice(newOrder.OrderDetails[index]);
        grossTotal = grossTotal + price;
        newOrder.OrderDetails[index].price = price;
    }
    // console.log("new");

    newOrder.grossTotal = grossTotal;

    try{
        const savedOrder = await newOrder.save();
        // console.log("test");
        res.status(212).json(savedOrder);
    }
    catch(err){
        res.status(512).json(err);
    }
});

router.get("/getAllOrders/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const allOrders = await Order.find(req.body);
        
        res.status(211).json(allOrders);
    }
    catch(err){
        res.status(511).json(err);
    }

    

});

router.put("/updateStatus/:id/:OrderID", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.OrderID, {
            orderStatus: req.body.orderStatus
        }, {new:true});

        res.status(212).json(updatedOrder);
    }
    catch(err){
        res.status(512).json(err);
    }
});

module.exports = router;