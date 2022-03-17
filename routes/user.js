const User = require("../models/User");
const { verfiyToken, verifyTokenAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get("/:id", verifyTokenAuthorization, async (req, res) =>{

    try{
        const user = await User.findOne({_id: req.params.id});
        const {password, l_name, ...others } = user._doc;
        res.status(202).json(others);
    }
    catch(err){
        res.status(404).json(err);
    }
});

router.put("/update/:id", verifyTokenAuthorization, async (req, res) =>{

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(404).json(err);
    }
});

module.exports = router;