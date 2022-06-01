const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


<<<<<<< HEAD
router.post("/payment", (req, res) => {
    try {
        stripe.charges.create({
            source: req.body.tokenID,
            amount: req.body.amount,
            currency: "usd",
        }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
=======
router.post("/payment" , (req,res) =>{
    stripe.charges.create({
        source:req.body.tokenID,
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
>>>>>>> 0650c29fed3eda3b0994d626dada9c82fd4f1200
        }

        )
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;