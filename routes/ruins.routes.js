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

router.post('/add', addRuin);
router.patch('/:id', updateRuin);

router.delete('/:id', deleteRuin);
export default router;
