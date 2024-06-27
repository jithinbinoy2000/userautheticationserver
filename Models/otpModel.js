const mongoose = require('mongoose');

 const otpSchema =  new mongoose.Schema({
    email:String,
    emailotp:Number,
    ph_number:Number,
    ph_otp:Number,
    createdAt:{
        type:Number,
        expires:"1m",
        default:Date.now
    }
 })
 const otpusers =  mongoose.model("verifyusers",otpSchema)
 module.exports=otpusers