import * as dotenv from 'dotenv';
dotenv.config();
import {
    mongoConnect,
    mongoDisconnect,
    installTasks,
    installUsers,
} from './db.js';
import data from '../data/tasks.data';

describe('given a connection with MongoDB', () => {
    afterEach(async () => {
        await mongoDisconnect();
    });

    test('then should be possible connect to our DB ', async () => {
        const connect = await mongoConnect();
        expect(connect).toBeTruthy();
        expect(connect.connections[0].name).toBe(
            process.env.NODE_ENV === 'test' ? 'testDatabase' : 'FinalProjectDB'
        );
    });
});
