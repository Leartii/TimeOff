require('dotenv').config()
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next) {
    console.log(req.originalUrl)
    if(req.originalUrl === '/api/v1/generatetoken'){
        console.log("Inside the route")
        next();
    }
    else if(!req.headers['authorization']){ 
        console.log("here");
        res.status(401).json({msg : "Unauthorized"})
    } else{
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(" ")
        const token = bearerToken[1]
        jwt.verify(token, process.env.SECRET_KEY, (err,result) => {
            if(err) { 
                console.log("here 1")
                res.status(401).json({error : err});
            }
            req.payload = result;
            next()
        });
    }
}

module.exports = verifyToken

