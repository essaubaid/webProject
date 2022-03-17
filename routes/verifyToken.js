const jwt = require("jsonwebtoken");

const verfiyToken = (req, res, next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        });
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