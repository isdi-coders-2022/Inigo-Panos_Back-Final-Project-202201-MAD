import express from 'express';
import { addComment } from '../controllers/comment.controller.js';
import { loginRequired } from '../middlewares/login-control.js';

const router = express.Router();

router.post('/', loginRequired, addComment);

export default router;
