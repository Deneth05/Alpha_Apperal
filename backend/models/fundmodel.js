const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
   
    department:String,
    project:String,
    Allocated_Amount:String,
    spent_amount:String,
    

},{
    timestamps:true

})

const itemmodel=mongoose.model("Refundts",itemchema)
module.exports = itemmodel;