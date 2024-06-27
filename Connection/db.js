const mongoose = require('mongoose');    //import mangoose
const connectionstring = process.env.connectionstring  //import conncetion in env of mongodb
const otpusers = require('../Models/otpModel')
mongoose.connect(connectionstring).then(()=>{
    console.log("etablished mongodb connections");
}).catch((err)=>{
    console.log(`error ${err}`);
})
otpusers.createIndexes({createdAt:1},{expiredAfterSecond:0});