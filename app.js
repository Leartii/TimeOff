require('dotenv').config();
const express = require('express');
const notFound = require('./middleware/notfound')
const connectDb = require('./db/connectdb');
const generateToken = require('./controller/Token');
const verifyToken = require("./middleware/verifytoken")
const router = require('./routes/routes')
const app = express();
const updateDays = require("./script/script");
const schedule  = require("node-schedule");


app.use(express.json())
app.use(verifyToken)
app.use('/api/v1',router);
app.use(notFound);


const start = async ()=> {
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(4000, () => {
            console.log("Server is listening in port 4000");
        })
    } catch(err){
        console.log(err);
    }
    
}

const job = schedule.scheduleJob('0 0 0 1 1 *', function(){
        updateDays();
})

start()
