import mongoose from 'mongoose';

export function ruinCreator(modelName = 'Ruin') {
    const ruinSchema = new mongoose.Schema({
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        score: { type: Number, required: true },
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        // commentUser: {
        //     type: [
        //         {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'Comment',
        //         },
        //     ],
        // },
        // commentText: [
        //     {
        //         type: mongoose.Types.ObjectId,
        //         ref: 'Comment',
        //         // commentText_text: {
        //         //     type: mongoose.Types.ObjectId,
        //         //     ref: 'Comment',
        //         // },
        //         // author_id: {
        //         //     type: mongoose.Schema.Types.ObjectId,
        //         //     ref: 'Comment',
        //         // },
        //         // type: [
        //         //     {
        //         //         type: mongoose.Schema.Types.ObjectId,
        //         //         ref: 'Comment',
        //         //     },
        //         // ],
        //     },
        // ],
    });

    ruinSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
        },
    });

    let Ruin;
    if (mongoose.default.models[modelName]) {
        Ruin = mongoose.model(modelName);
    } else {
        Ruin = mongoose.model(modelName, ruinSchema);
    }
    return Ruin;
}

export const Ruin = ruinCreator();
