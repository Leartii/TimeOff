const Request = require("../model/Requests");
const {validateTimeoff} = require('../utils/validateTimeoff');
const verifyRequest = require("../utils/VerifyRequest");
const removeDays = require("../utils/removeDays");
const validateRequest = require('../utils/VerifyRequest');


const createRequest = async (req,res) => {
    console.log(req.payload.username) 
    validateTimeoff(req.payload.username,req.body.type,req.body.numOfDays).then( async (result) => {
        console.log(result); 
        if(!result) {
            res.json({msg : "Couldn't create request"})
            return false;
         } else{
            req.body.requester = req.payload.email 
            req.body.approver = result[0].manager;
            let request = await Request.create(req.body)
            return request;
         }
     }).then(result => {
        if(!result){
            res.json({msg : "Couldn't create request"})
            return
        } else{
            res.json(result);
            return
        }
     }).catch(err => {
         console.log(err);
     })
}

const editRequest = async(req,res) => {
    if(req.body.requester || req.body.approver){
        res.json({msg : "You cannot change the requester or the approver of the request"})
    }
    else{
       let request = await Request.findByIdAndUpdate(req.body.id,req.body);    
    }
}

const deleteRequest = async (req,res) => {
    let deleteRequest = Request.findByIdAndDelete(req.body.id);
    if(!deleteRequest){
        res.json({msg : "No request with such id found"})
    } else{
        res.json(deleteRequest);
    }
}

const approveRequest = (req,res) => {
    let request = ''   
    verifyRequest(req.params.id, req.url).then(async (result) => {
        if(!result) {
            res.json({msg : "Request could not be approved"});
            return
        } else{
            request = result;
            let removedays = await removeDays(req.body.email,result[0].numOfDays)
            return removedays
        }
    }).then(result => {
        if(!result){
            res.json({msg : "Request could not be approved"})
        } else {
            res.json(request);
        }
    }).catch(err => {
        console.log(err)
    })
    console.log("Approve request");
}

const rejectRequest = (req,res) => {
    verifyRequest(req.params.id,req.url).then(result => {
        if(!result){
            res.json({msg : "Could not reject request"});
        } else {
            res.json(result)
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    createRequest,
    editRequest,
    deleteRequest,
    approveRequest,
    rejectRequest
}