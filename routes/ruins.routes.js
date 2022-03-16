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

const router = express.Router();

router.get('/', getAllRuins);
router.get('/:id', getRuin);

router.post('/add', loginRequired, addRuin); //adminRequired
router.patch('/:id', updateRuin); //adminRequired

router.delete('/:id', deleteRuin); //adminRequired

router.patch('/:id/user/favorites', addFavorite); //loginRequired
export default router;
