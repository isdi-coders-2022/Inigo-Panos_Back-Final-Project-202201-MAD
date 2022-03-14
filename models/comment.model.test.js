import { mongoConnect, mongoDisconnect } from '../services/db.js';
import { commentCreator } from './comment.model.js';

describe('given a connection with MongoDB', () => {
    const collection = 'testingTasks';
    beforeAll(() => {
        mongoConnect();
    });
    afterAll(() => {
        mongoDisconnect();
    });

    test('then should exist our Model ', () => {
        const Task = commentCreator(collection);
        expect(Task).toBeTruthy();
        expect(Task.modelName).toBe(collection);
    });
});
