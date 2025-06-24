const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  cancelByDoctor,
  getDoctorAppointments
} = require('../controllers/appointmentController');

// Patient routes
router.get('/mine', protect, getMyAppointments);
router.post('/book', protect, bookAppointment);
router.delete('/:id', protect, cancelAppointment);

// Doctor routes
router.delete('/:id/doctor', protect, cancelByDoctor);
router.get('/doctor', protect, getDoctorAppointments);

module.exports = router;
