const mongoose=require("mongoose")


const userchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    address:String,
    phone:String,
 
  
  
   

},{
    timestamps:true

})

const User=mongoose.model("Users",userchema)
module.exports = User;