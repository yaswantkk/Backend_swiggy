const vendorController=require("../controllers/vendorControllers")
const express=require('express')
const router=express.Router()

router.post('/register',vendorController.vRegister)
router.post('/login',vendorController.vendorLogin)
router.get('/all-vendors',vendorController.getVendor)
router.get('/single-vendor/:id',vendorController.getVendorById)




module.exports=router;