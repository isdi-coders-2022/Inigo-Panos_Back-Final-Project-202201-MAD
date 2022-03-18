import { Comment } from '../models/comment.model.js';
import { Ruin } from '../models/ruin.model.js';

export const deleteComment = async (req, res, next) => {
    try {
        const { id: ruinId, commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        const resposne = await Ruin.findByIdAndUpdate(
            ruinId,
            {
                $pull: { comments: commentId },
            },
            { new: true }
        );
        // const ruinWithComment = await Ruin.findOne({
        //     comments: { $in: [commentId] },
        // });
        // const ruinWithCommentUpdated = await Ruin.findByIdAndUpdate(
        //     ruinWithComment._id,
        //     { $pull: { comments: commentId } }
        // );
        // const ruinWithCommentUpdated = await Ruin.updateOne(
        //     {
        //         comments: { $in: [commentId] },
        //     },
        //     { $pull: { comments: commentId } }
        // );
        // const commentedRuin = await Ruin.findById(req.params.id);
        // console.log(commentedRuin, ' ruin comented delete');
        // const deletedComment = await Comment.findByIdAndDelete(
        //     commentedRuin.comments
        // );
        res.status(202);
        res.json({ 'Ruin Without Comment': resposne });
    } catch (err) {
        next(err, 'no se ha podido borrar el comentario especificado.');
    }
};

export const addComment = async (req, res, next) => {
    try {
        const { id: ruinId } = req.params;

        const result = await Comment.create(req.body);
        const commentId = result._id;

        const response = await Ruin.findByIdAndUpdate(
            ruinId,
            {
                $push: { comments: commentId },
            },
            { new: true }
        );
        res.status(201);
        res.json(response);
    } catch (err) {
        next(err, 'no se ha podido crear el comentario especificado.');
    }
};
