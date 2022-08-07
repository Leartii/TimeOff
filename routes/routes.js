const express = require('express');
const router = express.Router();

const generateToken = require('../controller/Token');

const {createUser,
       getUser,
       editUser,
       deleteUser} = require("../controller/Users");

const {
    createRequest,
    editRequest,
    deleteRequest,
    approveRequest,
    rejectRequest } = require("../controller/Requests");

router.route("/users").post(createUser)
router.route("/users/:id").get(getUser).patch(editUser).delete(deleteUser)
router.route("/requests").post(createRequest)
router.route("/routes/:id").patch(editRequest).delete(deleteRequest)
router.route("/requests/:id/approve").patch(approveRequest)
router.route("/requests/:id/reject").patch(rejectRequest)
router.route("/generatetoken").post(generateToken);
module.exports = router