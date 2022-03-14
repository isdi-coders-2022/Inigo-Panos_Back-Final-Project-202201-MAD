import mongoose from 'mongoose';

export function ruinCreator(modelName = 'Ruin') {
    const ruinSchema = new mongoose.Schema({
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        score: { type: Number, required: true },
        comments: [{}],
    });
    ruinSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject.__v;
        },
    });

    if (mongoose.default.models[modelName]) {
        Ruin = mongoose.model(modelName);
    } else {
        Ruin = mongoose.model(modelName, ruinSchema);
    }
    return Ruin;
}

export let Ruin = ruinCreator();
