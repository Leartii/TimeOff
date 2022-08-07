const mongoose = require("mongoose");

let connectDb = (url) => {
    mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
}

module.exports = connectDb;