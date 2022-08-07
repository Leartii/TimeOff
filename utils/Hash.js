const bcrypt = require('bcrypt');
const User = require('../model/Users');

const verifyUser = async (email,password) =>{
    let rezult = {};
    try{
        let user = await User.find({email : email},['password','salt']).then(async (result) => {
            rezult = result;
            let hashp = await hashPass(password,result[0].salt);
            return hashp;
        }).then((result) => { 
            if(result == rezult[0].password){
                return {username : email};
            } else {
                return false;
            }
        })
        return user;
    }  catch(err){
        console.log(err);
    }
}

const hashPass = async (password, salt) => {
    if(!password){
        console.log("if(!password){")
       return null;
    }
    else if(!salt){
        console.log('else if(!salt){')
        salt = await bcrypt.genSalt();
        hashedpass = await bcrypt.hash(password,salt);
        console.log("hash + salt" + {hash : hashedpass, salt : salt})
        return {hash : hashedpass, salt : salt};
    } else {
        console.log("herre")
        let pass = await bcrypt.hash(password,salt);
        return pass;
    }
}

module.exports = {hashPass,verifyUser};