const express = require('express'); 
const router = express.Router();

const {
  getDoctorDashboard,
  addAvailability,
  getAvailability,
  searchDoctors,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorAccount,
  getDoctorPatients,getTodaySchedule
} = require('../controllers/doctorController');

const { protect } = require('../middlewares/authMiddleware');



router.get('/dashboard', protect, getDoctorDashboard);
router.post('/availability', protect, addAvailability);
router.get('/:id/availability',protect, getAvailability)
router.get('/search', searchDoctors);
router.get('/profile', protect, getDoctorProfile);
router.put('/profileupdate', protect, updateDoctorProfile);
router.delete('/deleteaccount', protect, deleteDoctorAccount);
router.get('/patients', protect, getDoctorPatients);
router.get('/today-schedule', protect, getTodaySchedule);


module.exports = router;
