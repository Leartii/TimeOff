const mongoose = require("mongoose");
const { satisfies } = require("nodemon/lib/utils");

let user = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String,unique : true, required : true, dropDupes : true},
    position : {type : String, required : true, enum : ["Employee", "Manager", "Admin"]},
    manager : String,
    timeoff : {type : Number, required : true, default : 20},
    sickleave : {type : Number, required : true, default : 20},
    password : {type : String, required : true, select : false},
    salt : {type : String, select : false, required : true}
});

let User = mongoose.model("User",user);

module.exports = User;