const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ✅ use POST for signup/login
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// ✅ protect /me route
router.get('/me', protect, getMe);

module.exports = router;
