const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

// Simple validation route to check token
router.get('/validate', protect, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
