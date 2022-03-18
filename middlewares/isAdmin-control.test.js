import { adminRequired } from './isAdmin-control.js';
import { User } from '../models/user.model.js';

jest.mock('../services/auth.js');
jest.mock('../models/user.model.js');

describe('Given a route intercepted by loginRequired', () => {
    let req;
    let res;
    let next;
    let tokenError;
    let token;
    beforeEach(() => {
        tokenError = {
            message: 'token missing or invalid',
            status: '401',
            name: 'Unauthorized',
        };
        req = {
            params: '2222',
            tokenPayload: {
                userId: '1111',
            },
        };
        token = req.tokenPayload;
        res = {};
        req.get = jest.fn();
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('When authorization token is present', () => {
        beforeEach(() => {
            User.findById.mockReturnValue({
                id: 1,
            });
        });
        describe('And token is valid', () => {
            beforeEach(() => {
                User.findById.mockReturnValue({
                    isAdmin: true,
                });
            });
            test('Then call next', async () => {
                req.tokenPayload.id = '1';
                await adminRequired(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And token is not valid', () => {
            beforeEach(() => {
                User.findById.mockReturnValue({
                    isAdmin: true,
                });
            });
            test('Then call next with error', async () => {
                req.tokenPayload.id = '2';
                await adminRequired(req, res, next);
                // expect(res.status).toBe(401);
                expect(res.json).toHaveBeenCalled();
            });
        });
    });
    // describe('When authorization token is not present', () => {
    //     test('Then call next with error', async () => {
    //         req.get.mockReturnValue('');
    //         await adminRequired(req, res, next);
    //         expect(next).toHaveBeenCalledWith(tokenError);
    //     });
    // });
});
