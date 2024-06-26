const mongoose = require('mongoose');
const googleSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
})
const googleu = new mongoose.model('googleusers',googleSchema)
module.exports = googleu;