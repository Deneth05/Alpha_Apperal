

const express=require("express")


const usermodel = require("../models/suppliermodel");

const router = express.Router();


router.post("/create_supplier",async(req,res)=>{
    const data=new usermodel(req.body);
    await data.save();
    res.send({success:true,message:"user added"})
})

router.get("/supplier",async(req,res)=>{
    const data=await usermodel.find({})
    res.json({success:true,message:"",data:data})
})

router.put("/update_supplier",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await usermodel.updateOne({_id:id},rest)
    res.json({success:true,message:"updates successfully",data:data})


})

router.delete("/delete_supplier/:id",async(req,res)=>{
    const id=req.params.id
    const data=await usermodel.deleteOne({_id:id})
    res.json({success:true,messsage:"user deleted"})
})

router.get("/user_supplier/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await usermodel.findById(id);

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});









  






//get count in suppliers table
router.get("/count_supplier",async(req,res)=>{
    try{
        const suppliers=await usermodel.find({});

        return res.status(200).json({
            count:suppliers.length,
            data:suppliers
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count successfully",data:data})
    }

})
module.exports = router;