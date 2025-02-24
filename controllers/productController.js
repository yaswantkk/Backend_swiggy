const Product=require("../models/Product")
const Firm=require("../models/Firm")
const multer=require('multer')
const path = require('path');
const fs = require('fs');
const { error } = require("console");

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
}

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); 
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.test(ext)) {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

// Initialize multer with storage and fileFilter
const upload = multer({ storage, fileFilter })

const addProduct=async(req,res)=>{
    try {
      const{productname,price,category,bestseller,description}=req.body;
      const image = req.file ? req.file.filename : undefined;
   
      const firmId=req.params.firmId;
      const firm = await Firm.findOne({ _id: firmId });
      if(!firm){
        return res.status(402).json({error:"no firm found"})
      }
    const product=new Product({
        productname,price,category,image,bestseller,description,firm:firm._id  
    })
     const sp=await  product.save();
     firm.product.push(sp);
     await firm.save();
 res.status(201).json(sp)
    } catch (error) {
      console.error(error); // Logs the error to the console
      res.status(500).json({ message: "Error found", error: error.message });
    }
     
    }


const getProductByFirm=async (req,res)=>{
  try {
    const firmId=req.params.firmId
   const firm=await Firm.findById(firmId)
    if(!firm){
      return res.status(404).json({error:"firm not found"})
    }
    const product=await Product.find({firm:firmId});
    const restuarant=firm.firmname;
    return res.status(201).json({restuarant,product})
  } catch (error) {
    console.error(error); // Logs the error to the console
      res.status(500).json({ message: "Error found", error: error.message });
  }
}


const deleteProductByid=async(req,res)=>{
  try {
    const productId=req.params.productId;
    const deleteP=await Product.findByIdAndDelete(productId)
   if(!deleteP){
    return res.status(404).json({error:"product not found"})
   }
    res.status(201).json({message:"product deleted successfully"})

  } catch (error) {
     console.error(error); // Logs the error to the console
      res.status(500).json({ message: "Error found", error: error.message });
  }
}
  

module.exports={addProduct,upload,getProductByFirm,deleteProductByid}