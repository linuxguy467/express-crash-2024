import express from 'express';
import posts from './posts.js';

const router = express.Router();

// Routes
router.use('/posts', posts);

export default router;
