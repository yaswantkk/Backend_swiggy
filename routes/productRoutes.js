const express=require('express')
const router=express.Router();
const productController=require('../controllers/productController')

// router.post('/add-product/:firmId',(req, res, next) => {
//   productController.upload.single('image')(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'File upload error', error: err.message });
//     }
//     next();
//   });
// },productController.addProduct)

router.post('/add-product/:firmId', productController.upload.single('image'), productController.addProduct);
router.get('/get-allproducts/:firmId',productController.getProductByFirm)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);

    res.setHeader('Content-Type', 'image/jpeg'); // Fixing the header setting
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).json({ message: 'Image not found' });
        }
    });
});
router.delete('/delete/:productId',productController.deleteProductByid)

module.exports=router;