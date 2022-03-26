import { Comment } from '../models/comment.model.js';
import { Ruin } from '../models/ruin.model.js';
import { User } from '../models/user.model.js';

export const deleteComment = async (req, res, next) => {
    console.log(req.body);
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

        const userId = req.tokenPayload.userId;
        console.log(userId, 'ID DEL USUARIO DEL COMENTARIO');
        const responseUser = await User.findByIdAndUpdate(
            userId,
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
        res.json({
            'Ruin Without Comment': resposne,
            'User without comment': responseUser,
        });
    } catch (err) {
        next(err, 'no se ha podido borrar el comentario especificado.');
    }
};

export const addComment = async (req, res, next) => {
    // console.log(req.tokenPayload, 'req recibido en addComment');
    console.log(req.body, 'req.body recibido en addComment');
    try {
        const ruinId = req.body.ruin_id;
        const userId = req.tokenPayload.userId;

        console.log(
            userId,
            ruinId,
            ' al crear nuevo comentario en back. Texto, idUsuario, idRuina'
        );
        const result = await Comment.create(req.body);
        console.log(result, 'COMENTARIO CREADO');

        const commentId = result._id.toString();
        console.log('CLOG DESPUÉS DE COMMENTiD', commentId);
        const response = await Ruin.findByIdAndUpdate(
            ruinId,
            {
                $push: { comments: commentId },
            },
            { new: true }
        ).populate('comments');
        const responseUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { comments: commentId },
            },
            { new: true }
        );

        const resultOfPopulates = {
            response,
            responseUser,
        };
        res.status(201);
        res.json(resultOfPopulates);
    } catch (err) {
        next(err, 'no se ha podido crear el comentario especificado.');
    }
};
