const express = require('express');
const router = express.Router();
const { getPatientDashboard, updateProfile, deleteAccount ,getPatientProfile } = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // import multer upload middleware

router.get('/dashboard', protect, getPatientDashboard);
router.put('/update-profile', protect, upload.single('photo'), updateProfile); // combine update with photo upload
router.delete('/delete-account', protect, deleteAccount);
router.get('/profile', protect, getPatientProfile); 

module.exports = router;
