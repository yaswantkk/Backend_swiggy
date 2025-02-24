const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
const upload = multer({ storage, fileFilter });

const addFirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    if (!req.vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const firm = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

   const savedFirm= await firm.save();
    vendor.firm.push(savedFirm)
    await vendor.save()

    res.status(201).json({ message: 'Firm added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletefirmByid=async(req,res)=>{
  try {
    const firmId=req.params.firmId;
    const deleteP=await Firm.findByIdAndDelete(firmId)
   if(!deleteP){
    return res.status(404).json({error:"firm not found"})
   }
    res.status(201).json({message:"firm deleted successfully"})

  } catch (error) {
     console.error(error); // Logs the error to the console
      res.status(500).json({ message: "Error found", error: error.message });
  }
}
  

module.exports = { addFirm, upload,deletefirmByid };
