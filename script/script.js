const User = require('../model/Users');

let updateDays = async () => {
    let users = []
    getAllUsers().then(async (results) => {
        if(!results) {
            console.log("no results were found");
        } else {
            for(const user in results) {
                let pto = 20;
                if(user.timeoff > 10){
                    pto += 10;
                }
                else{
                    pto += user.timeoff;
                }
                let update = await User.findByIdAndUpdate(user.id, {timeoff : pto, sickleave : 20});
            }
        }
    })
}

const getAllUsers = async () => {
    let users = await User.find();
    return users
}

module.exports = updateDays