import express from 'express';
import {
    userLogin,
    userRegister,
    getAllUsers,
    getUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/', getAllUsers);
router.get('/:id', getUser);
export default router;
