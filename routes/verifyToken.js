const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verfiyToken = async(req, res, next) =>{
    const authHeader = req.headers.token;
    const user = await User.findById(req.params.id);
    if(authHeader){
        const token = authHeader.split(" ")[1];
        if(user.token == token){
            jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
                if(err) res.status(403).json("Token is not valid");
                req.user = user;
                next();
            });
        }
        else{
            return res.status(401).json("You are not authenticated");
        }
    }
    else{
        return res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAuthorization = (req, res, next)=>{
    verfiyToken(req, res, ()=>{
        if(req.user.id === req.params.id){
            next();
        }
        else{
            res.status(403).json("Incorrect Token");
        }
    });
}

module.exports = {verfiyToken, verifyTokenAuthorization};