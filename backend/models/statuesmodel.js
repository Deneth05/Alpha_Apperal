
const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
    type:String,
    request:String,
 
    
    is_complete:{
        type:Boolean,
        default:false

    },
   

},{
    timestamps:true

})

const itemmodel=mongoose.model("requests",itemchema)
module.exports = itemmodel;