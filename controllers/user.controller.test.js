import * as controller from './user.controller.js';

import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('../services/auth.js');
jest.mock('bcryptjs');

describe('Given the tasks controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('When getAllUsers is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                // users;
                User.find.mockReturnValue({
                    populate: jest.fn().mockResolvedValue([]),
                });
            });
            test('Then the call is sent', async () => {
                await controller.getAllUsers(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
    });

    describe('When loginUser is called', () => {
        describe('And there is no userName', () => {
            beforeEach(() => {
                // users;
                User.findOne.mockReturnValue({
                    populate: jest.fn().mockResolvedValue(null),
                });
            });

            test('Then call next', async () => {
                await controller.userLogin(req, res, next);
                expect(res.json).toHaveBeenCalledWith({
                    message: 'Error, el usuario no existe undefined undefined',
                });
            });
        });

        describe('And there is no password', () => {
            beforeEach(() => {
                // users;
                User.findOne.mockReturnValue({
                    populate: jest.fn().mockResolvedValue(null),
                });
            });
            test('Then call next', async () => {
                await controller.userLogin(req, res, next);
                expect(res.json).toHaveBeenCalledWith({
                    message: 'Error, el usuario no existe undefined undefined',
                });
            });
        });
    });
});
