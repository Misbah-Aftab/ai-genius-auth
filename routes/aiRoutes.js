const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/free-model', (req, res) => {
  res.json({
    message: 'Free AI model response',
    user: req.user.email,
    role: req.user.role,
    data: 'Basic text generation result: Hello from AI-Genius Free Tier!',
  });
});

router.post('/premium-model', restrictTo('Premium_User', 'Admin'), (req, res) => {
  res.json({
    message: 'Premium AI model response',
    user: req.user.email,
    role: req.user.role,
    data: 'Advanced image generation result: Ultra-HD AI art created!',
  });
});

router.delete('/purge-cache', restrictTo('Admin'), (req, res) => {
  res.json({
    message: 'Cache purged successfully',
    user: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
