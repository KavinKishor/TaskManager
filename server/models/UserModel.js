const mongoose = require('mongoose')

const userSchmea = mongoose.Schema({
    name:{type:String,trim:true,required:true},
    email:{type:String,trim:true,unique:true,required:true},
    password:{type:String,required:true},
    
})
module.exports= mongoose.model("Users",userSchmea)
