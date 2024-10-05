const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
   
    fname:String,
    emaill:String,
    idnumber:String,
    doc1:String,
    doc2:String,
    doc3:String,
    join_date:String,
    designation:String,
    department:String,
    basic_salary:String,
    allownance:String,
    skill_level:String,
   
},{
    timestamps:true

})

const itemmodel=mongoose.model("Employees",itemchema)
module.exports = itemmodel;