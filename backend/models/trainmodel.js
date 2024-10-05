const mongoose=require("mongoose")


const Trainchema=mongoose.Schema({
    usersname:String,
    trainname:String,
    description:String,
    sheduleDate:String,
    sheduleTime:String,
    releventDepartment:String,
    options:String,
  
  
   

},{
    timestamps:true

})

const Trainers=mongoose.model("Trainers",Trainchema)
module.exports = Trainers;