import mongoose from 'mongoose';

export function commentCreator(modelName = 'Comment') {
    const commentSchema = new mongoose.Schema({
        author_id: { type: String, required: true },
        ruin_id: { type: String, required: true },
        text: { type: String, required: true },
    });
    commentSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
        },
    });

    if (mongoose.default.models[modelName]) {
        Comment = mongoose.model(modelName);
    } else {
        Comment = mongoose.model(modelName, commentSchema);
    }
    return Comment;
}

export let Comment = commentCreator();
