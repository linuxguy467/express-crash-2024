const express = require('express');
const posts = require('./posts');

const router = express.Router();

// Routes
router.use('/posts', posts);

module.exports = router;
