const User = require("../model/Users");
const {hashPass,verifyUser} = require("../utils/Hash");


const createUser = async (req,res) => {
    console.log(req.payload.username+ "  "+typeof req.payload.username);
    getPosition(req.payload.username).then( async (result) =>{
        console.log("result : "+result);
        console.log("result.position : "+result[0].position+", req.position : "+req.body.position);
        if((result[0].position == "Admin" && req.body.position == "Manager") 
        || (result[0].position == "Manager" && req.body.position == "Employee")){
             let hashi = await hashPass(req.body.password)
             return hashi;
         }
         else{
             console.log("Executing here")
             res.json({msg : "You don't have sufficient privileges to create user with this position"})
         }
    }).then(async (result) => {
            req.body.password = result.hash;
            req.body.salt = result.salt;
            let user = await User.create(req.body);
            return user;
        }).then((result) => {
            res.json({"user" : result});
        }).catch(error => {
            console.log("error "+error)
        })
}

const getUser = async (req,res) => {
    const user = await User.find({email : req.params.id});
    console.log(user)
    if(!user){
        res.json({msg : "No user found"});
    } else{
        res.json({user : user});
    }
    console.log("Get users");
}

const deleteUser = (req,res) => {
    getPosition(req.payload.username).then(async (result) => {
        if(result[0].position != "Manager"){
            res.json({msg : "You don't have sufficient privileges for user deletion"});
        }
        else{
            let deleteuser = await User.findOneAndDelete({email : req.params.id});
            return deleteuser;
        }
    }).then(result =>{
        if(!result){
            res.json({msg : "Couldn't delete"});
        } else{
            res.json({msg : "User deleted successfully", user : result});
        }
    })
    console.log("Delete users");
}

const editUser = async (req,res) => {
    let updateuser = await User.findOneAndUpdate({email : req.params.id}, req.body, {
        new : true,
    })
    if(!updateuser){
        res.status(404).json({msg : "The user did not get updated"});
    }
    res.json({updateuser});
}

module.exports = {createUser,
                  getUser,
                  editUser,
                  deleteUser}

const getPosition = async (email) => {
     let user = await User.find({email : email});
     return user;
}
