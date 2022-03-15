import { Ruin } from '../models/ruin.model.js';

export const getAllRuins = async (req, res, next) => {
    try {
        const resp = await Ruin.find({});
        res.status(200);
        res.json(resp);
    } catch (err) {
        next(err);
    }
};

export const getRuin = async (req, res, next) => {
    try {
        const resp = await Ruin.findById(req.params.id).populate({
            path: 'comments',
            populate: [
                {
                    path: 'author_id',
                    select: 'userName',
                },
                {
                    path: 'ruin_id',
                    select: 'name',
                },
            ],
        });
        console.log(resp?.commentText);
        res.status(200);
        res.json(resp);
    } catch (err) {
        next(err, 'no existe la ruina especificada.');
    }
};

export const deleteRuin = async (req, res, next) => {
    try {
        await Ruin.findByIdAndDelete(req.params.id);
        res.status(202);
        res.json({ 'Deleted Ruin': req.params.id });
    } catch (err) {
        next(err, 'no se ha podido borrar la ruina especificada.');
    }
};

export const updateRuin = async (req, res, next) => {
    try {
        const resp = await Ruin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201);
        res.json(resp);
    } catch (err) {
        next(err, 'no se ha podido actualizar la ruina especificada.');
    }
};

export const addRuin = async (req, res, next) => {
    try {
        const result = await Ruin.create(req.body);
        res.status(201);
        res.json(result);
    } catch (err) {
        next(err, 'no se ha podido crear la ruina especificada.');
    }
};