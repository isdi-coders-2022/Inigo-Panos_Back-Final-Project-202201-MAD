import express from 'express';
import {
    getAllRuins,
    updateRuin,
    addRuin,
    deleteRuin,
    getRuin,
    addFavorite,
} from '../controllers/ruin.controller.js';
import { loginRequired } from '../middlewares/login-control.js';
import { adminRequired } from '../middlewares/isAdmin-control.js';

const router = express.Router();

router.get('/', getAllRuins);
router.get('/:id', getRuin);

router.post('/add', loginRequired, adminRequired, addRuin); //adminRequired
router.patch('/:id', loginRequired, adminRequired, updateRuin); //adminRequired
router.delete('/:id', loginRequired, adminRequired, deleteRuin); //adminRequired

router.patch('/:id/user/favorites', loginRequired, addFavorite); //loginRequired
export default router;
