require('dotenv').config();
const User = require("../model/Users");
const {hashPass,verifyUser} = require("../utils/Hash");
const jwt = require("jsonwebtoken");


const generateToken = (req,res) => {
    if (req.body.email&&req.body.password){
        verifyUser(req.body.email,req.body.password).then((result) => {
            if(result == false)
            {
                res.json({msg : "You have provided incorrect credentials"});
            }
            else {
                
                let token = jwt.sign(result,process.env.secret_key);
                res.json({"Token" : token});
            }
           
        })
    }
    else{
        res.json({"msg" : "Please provide the email address and password as part of request"});
    }
}


module.exports = generateToken;
