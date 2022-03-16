import express from 'express';
import {
    userLogin,
    userRegister,
    getAllUsers,
    addFavorite,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/details', addFavorite);
router.get('/', getAllUsers);
export default router;
