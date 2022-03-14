import mongoose from 'mongoose';
import { userCreator } from './user.model';

jest.mock('mongoose');

describe('Given the User model', () => {
    beforeAll(() => {
        mongoose.Schema.mockImplementation(function () {});
        mongoose.Schema.prototype.set = jest.fn();
        mongoose.model.mockReturnValue({});
    });

    test('Using previous model', () => {
        mongoose.default = {
            models: {
                User: {
                    // This is intentional
                },
            },
        };
        const model = userCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
    test('Creating a model', () => {
        mongoose.default = {
            models: {
                // This is intentional
            },
        };
        const model = userCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
});
