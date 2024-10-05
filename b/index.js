const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const orderRoutes = require("./routes/orderroutes");
const supplierRoutes = require("./routes/supplierroutes");

const app=express();
app.use(cors());
app.use(express.json());

app.use("/", orderRoutes);
app.use("/", supplierRoutes);


const PORT=process.env.PORT||8060











mongoose.connect("mongodb+srv://admin:admin1234@cluster0.tayveae.mongodb.net/new_supplier_db?retryWrites=true&w=majority").then(()=>{
    console.log(`server connection ${PORT} !`);
    app.listen(PORT,()=>console.log("server connection successful "))
}).catch((err)=>{
    console.log(err)
})