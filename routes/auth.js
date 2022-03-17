const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        phone_number: req.body.phone_number,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials!");

        const passwordHash = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY).toString(CryptoJS.enc.Utf8);
        passwordHash !== req.body.password && res.status(401).json("Wrong credentials!");

        const accessToken = jwt.sign({
            id: user._id,
        }, 
        process.env.JWT_KEY,
        {expiresIn:"1d"}
        );
        
        const {password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    }
    catch (err){
       res.status(501).json(err); 
    }
});

module.exports = router;