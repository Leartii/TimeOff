const { get } = require('mongoose');
let User = require('../model/Users');


const validateTimeoff = async (email, type, numDays) => {
    type = type.toLowerCase();
    let reqtype  = '';
    if(type == 'pto'){
        reqtype = 'timeoff'
    } else if(type == 'sick leave'){
        reqtype == 'sickleave';
    } else{
        return false;
    }
    getUser(email).then((result) => {
        console.log("result: "+result)
        if(!result) {
            console.log("User could not be found");
        } else {
            if(numDays > result[0][type]){
                return false;
            } else {
                return result;
            }
        }
    })
}

const removeDays = async (email, numberOfDays, type) => {
    type = type.toLowerCase();
    if(type == "pto"){
        let updateUser = await User.findOneAndUpdate({email : email}, {timeoff : timeoff - numberOfDays});
    } else if(type == "sick leave") {
        let updateUser = await User.findOneAndUpdate({email : email}, {sickleave : sickleave - numberOfDays});
    } else{
        return false;
    }
    return updateUser;
}

const getUser = async (email) =>{
    let user = await User.find({email : email});
    return user;
}

module.exports = {
    validateTimeoff,
    removeDays
}