require('dotenv').config()//Loads .env file contents into process.env by default
require('./Connection/db') //establishing connection while server start 
const cors = require('cors') // allow data share
const router = require('./Routes/routes') // import router
const express = require('express')
const app = express()
const gauth = require('./Setup/googleauthsetup')
app.use(cors(
    {origin:"http://localhost:5173",
    methods:'GET,POST,PUT,DELETE',
    credentials:true}
))
app.use(express.json())//Returns middleware that only parses json and only looks at requests 
              //where the Content-Type header matches the type option.   
app.use(gauth)                      
app.use(router);

//hosting
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`authetication server is runnig at port: ${PORT}`);
})
app.get('/',(request,response)=>{
    response.status(200).send("server started")
});
