const mongoose = require("mongoose");

const request = new mongoose.Schema({
    requester : {type : String, required : true},
    numOfDays : {type : Number, required : true},
    approver : {type : String, required : true},
    status : {type : String, enum : ["Pending", "Approved", "Rejected"], default : "Pending"},
    type : {type : String, enum : ["timeoff", "sickleave"]}
});

let Request = mongoose.model("Request", request);

module.exports = Request;