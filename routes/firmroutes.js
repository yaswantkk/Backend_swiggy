const express = require('express');
const firmController = require('../controllers/firmController');
const { verifyToken } = require('../middlewares/verifytoken'); 
const router = express.Router();


router.post('/add-firm', verifyToken, (req, res, next) => {
  firmController.upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }
    next();
  });
}, firmController.addFirm);

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

router.delete('/delete/:firmId',firmController.deletefirmByid)

module.exports = router;
