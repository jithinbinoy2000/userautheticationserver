const { request, response } = require('express') //express  
const jwt = require('jsonwebtoken')              //jwt token
const users = require('../Models/userModel')  //model for mongoose to mongoDB
exports.register= async (request,response)=>{
const{email,username,password}=request.body //
try { const existingUser =await users.findOne({email,username}) // checking request body  and model

 if(existingUser){
    response.status(406).json("User already exist , please login !!!")
 }else{
    const newUser = new users({
        email,username,password
    })
    
   await  newUser.save()
    response.status(200).json(newUser)
 }}
 catch(error){
response.status(401).json(error)
 }
}
exports.login = async(request,response)=>{
try{ const {email,password}=request.body
    const existingUser = await users.findOne({email,password})
    if(existingUser){ // success
        //token
       const token =  jwt.sign(
        {existingUser},process.env.jwt_secret) //payload,key
      // console.log(token);
        response.status(200).json({existingUser,token})
    }else{
        response.status(406).json("invalid Email / password")
    }}
    catch(err){
        response.status(401).json(err)
    }
}

