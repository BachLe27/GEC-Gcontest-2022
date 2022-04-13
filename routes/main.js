const express = require('express');
const router = express.Router();
const path = require('path');

// @route   GET /
// @desc    Landing Page
// @access  Public
router.get('/', (req, res) => {
   res.sendFile('index.html', {root: path.join(__dirname, '../views')});
}) 

module.exports = router;