const User = require("../model/Users");

const removeDays = async (user,numberofDays) =>{
    let removedays = await User.findOneAndUpdate({email : email}, {"$inc" : {"timeoff" : -numberofDays}})
    return removedays;
}

module.exports = removeDays