const userController = require('../Controllers/userController')
const express = require('express')
const router = express.Router()// set path
//set path for register
router.post('/register',userController.register)
router.post('/login',userController.login)


module.exports=router