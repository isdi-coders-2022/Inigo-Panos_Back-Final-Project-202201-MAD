import express from 'express';
import {
    getAllRuins,
    updateRuin,
    addRuin,
    deleteRuin,
    getRuin,
} from '../controllers/ruin.controller.js';

const router = express.Router();

router.get('/', getAllRuins);
router.get('/:id', getRuin);

router.post('/add', addRuin); //adminRequired
router.patch('/:id', updateRuin); //adminRequired

router.delete('/:id', deleteRuin); //adminRequired
export default router;
