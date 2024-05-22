const mongoose = require('mongoose');    //import mangoose
const connectionstring = process.env.connectionstring  //import conncetion in env of mongodb
mongoose.connect(connectionstring).then(()=>{
    console.log("etablished mongodb connections");
}).catch((err)=>{
    console.log(`error ${err}`);
})