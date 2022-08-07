let User = require("../model/Users")
let Request = require("../model/Requests");
const res = require("express/lib/response");

const verifyRequest = async (request,requester,approver,type) => {
    findUser(requester).then(async (result) => {
        if(!result) {
            res.json({msg : "Requester is not a valid user"});
            return
        } else{
            if(result[0].manager !== approver){
                res.json({msg : "You're not allowed to approve/reject this request"});
                return false;
            }
            else{
                let approve = await Request.findByIdAndUpdate(request, {status : type});
                return approve;   
            }
        }
    }).then( result => {
        if(!result){
            res.json({msg : "Could not update request"});
            return
        } else{
            return result;
        }
    })
}


const findUser = async (email) => {
    let user = User.find(email);
    return user;
}

module.exports = verifyRequest