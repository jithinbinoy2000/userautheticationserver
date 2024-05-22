const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})
const users = mongoose.model('users',userSchema)
module.exports = users