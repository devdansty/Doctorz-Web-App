const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const {
  getAllDoctors,
  getAllPatients,
  getSystemStats,
  deleteUser,
  blockUser,
  unblockUser,
  approveDoctor
} = require('../controllers/adminController');

router.get('/doctors', protect, adminOnly, getAllDoctors);
router.get('/patients', protect, adminOnly, getAllPatients);
router.get('/stats', protect, adminOnly, getSystemStats);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.put('/users/:id/block', protect, adminOnly, blockUser);
router.put('/users/:id/unblock', protect, adminOnly, unblockUser);
router.put('/doctors/:id/approve', protect, adminOnly, approveDoctor);


module.exports = router;
