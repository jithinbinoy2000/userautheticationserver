require('dotenv').config()//Loads .env file contents into process.env by default
const express = require('express')
const cors = require('cors') // allow data share
const router = require('./Routes/routes') // import router
require('./Connection/db')

//create a server
const authicetionserver =express()
authicetionserver.use(cors())
authicetionserver.use(express.json())//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
authicetionserver.use(router)


//hosting
const PORT = 3000
authicetionserver.listen(PORT,()=>{
    console.log(`authetication server is runnig at port: ${PORT}`);
})
authicetionserver.get('/',(request,response)=>{
    response.status(200).send(` server started`)
})