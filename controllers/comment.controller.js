import { Comment } from '../models/comment.model.js';

export const deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(202);
        res.json({ 'Deleted comment': req.params.id });
    } catch (err) {
        next(err, 'no se ha podido borrar el comentario especificado.');
    }
};

export const addComment = async (req, res, next) => {
    try {
        const result = await Comment.create(req.body);
        res.status(201);
        res.json(result);
    } catch (err) {
        next(err, 'no se ha podido crear el comentario especificado.');
    }
};
