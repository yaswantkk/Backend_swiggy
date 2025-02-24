const Vendor=require('../models/Vendor')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const dotenv=require('dotenv')

dotenv.config();
const secretkey=process.env.secretkey;


const vRegister=async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const vendorEmail=await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(401).json("email already registered")
        }

        const hassedPassword=await bcrypt.hash(password,10)

        const nv=new Vendor({
            username,
            email,
            password:hassedPassword
        })
        await nv.save();
        
        res.status(201).json("User registered successfully")
        console.log("registered")

    }catch(err){
        console.log('err')
        res.status(501).json({error:'Internal server error'})
    }
    
}


const vendorLogin=async (req,res)=>{
    const{email,password}=req.body
    try{
        const vemail=await Vendor.findOne({email})
    if(!vemail  || !(await bcrypt.compare(password,vemail.password))){
        return res.status(401).json({message:"username or password unmatched"})
    }
    const token=jwt.sign({vendorId:vemail._id},secretkey)
    res.status(201).json({message:"logined successfully",token})
    }catch(err){
        console.log(err);
        res.status(501).json("error occured")
    }
}


const getVendor=async (req,res)=>{
    try {
      const vendors=await Vendor.find().populate('firm')
        res.json(vendors)
    } catch (err) {
        console.log(err);
        res.status(501).json("error occured") 
    }
}


const getVendorById=async (req,res)=>{
    const vid=req.params.id;
    try {
       const vendor=await Vendor.findById(vid).populate('firm')
       if(!vendor){
        return res.status(401).json({error:"internal server error"})
       }
       res.status(201).json({vendor}) 
    } catch (error) {
        console.log(err);
        res.status(501).json("error occured") 
        
    }
}





module.exports={vRegister,vendorLogin,getVendor,getVendorById}