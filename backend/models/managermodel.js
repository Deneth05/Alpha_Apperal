const mongoose=require("mongoose")


const adminchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    address:String,
    phone:String,
 
  
  
   

},{
    timestamps:true

})

const Manager=mongoose.model("Admin",adminchema)
module.exports = Manager;