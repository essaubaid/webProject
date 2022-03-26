const Review = require("../models/Reviews");
const { verifyTokenAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.post("/createReview/:id", verifyTokenAuthorization, async (req, res)=>{
    const newReview = new Review({
        userID: req.params.id,
        productID: req.body.productID,
        rating: req.body.rating,
        description: req.body.description
    });
    try{
        const savedReview = await newReview.save();
        res.status(206).json(savedReview);
    }
    catch(err){
        res.status(505).json(err);
    }
});

router.get("/getReview", async (req, res)=>{
    try{
        const allReview = await Review.find(req.body);

        res.status(205).json(allReview);
    }
    catch(err){
        res.status(505).json(err);
    }

});

router.put("/updateReview/:id/:ProductID", verifyTokenAuthorization, async (req, res)=>{
    try{
        const updatedReview = await Review.findOneAndUpdate({productID: req.params.ProductID}, {
            description: req.body.description
        }, {new:true});
        res.status(200).json(updatedReview);
    }
    catch(err){
        res.status(404).json(err);
    }
});

module.exports = router;