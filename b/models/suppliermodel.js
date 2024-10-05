const mongoose=require("mongoose")
const dataschema=mongoose.Schema({
    name:String,
    nic:String,
    phone:String,
    email:String,
    product:String,
    type:String,
    unitPrice:Number,
    contractStart:String,
    contractEnd:String,
})




const usermodel=mongoose.model("supplier",dataschema)
module.exports = usermodel;