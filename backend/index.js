const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const fundroutes = require("./routes/fundroutes");
const managerfund = require("./routes/managerfund");
const itemfund = require("./routes/itemfund");
const app=express()

app.use(cors())
app.use(express.json())

app.use("/", fundroutes);
app.use("/", managerfund);
app.use("/", itemfund);
const PORT=process.env.PORT||8020







mongoose.connect("mongodb+srv://FManager:financemanager@financial-management.xrypgtd.mongodb.net/?retryWrites=true&w=majority&appName=Financial-Management")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

