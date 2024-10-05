const express=require("express")


const Train = require("../models/trainmodel");

const router = express.Router();

router.post("/add_trainer",async(req,res)=>{
    const data=new Train(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
  })


  router.get("/traines",async(req,res)=>{
    const data= await Train.find({})
  
    res.json({success:true,data:data})
});



router.put("/trainer_update",async(req,res)=>{
  const {id,...rest}=req.body
  const data=await Train.updateOne({_id:id},rest)
  res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/trainer_delete/:id",async(req,res)=>{
const id=req.params.id
const data=await Train.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})





router.get("/trainer_order/:id", async (req, res) => {
  const id = req.params.id;

  try {
      const order = await Train.findById(id);

      if (!order) {
          return res.status(404).send({ success: false, message: "User not found" });
      }

      res.send({ success: true, message: "User fetched successfully", data: order });
  } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;


