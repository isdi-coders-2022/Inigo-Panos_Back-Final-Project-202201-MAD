import * as controller from './ruin.controller.js';
import bcrypt from 'bcryptjs';
import { Ruin } from '../models/ruin.model.js';
import { Comment } from '../models/comment.model.js';
import { User } from '../models/user.model.js';

jest.mock('../models/ruin.model.js');
jest.mock('../models/comment.model.js');
jest.mock('../models/user.model.js');
jest.mock('../services/auth.js');

describe('Given the ruin controller', () => {
    let req;
    let res;
    let next;
    let mockRuin;
    let userId;
    let isInFavorites;
    let updatedUser;

    beforeEach(() => {
        req = { params: {} };
        res = {};

        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();

        userId = '6230785357282c2abf249e6b';
    });
    describe('When getAllRuins is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                Ruin.find.mockReturnValue({
                    populate: jest.fn().mockResolvedValue([]),
                });
            });
            test('Then call json', async () => {
                await controller.getAllRuins(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And it does not work', () => {
            beforeEach(() => {
                Ruin.find.mockRejectedValue('null');
            });

            test('Then next is called', async () => {
                await controller.getAllRuins(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When getRuin is called', () => {
        describe('And it works', () => {
            beforeEach(() => {
                Ruin.findById.mockResolvedValue([
                    {
                        name: 'Teatro Romano',
                        location: 'Mérida',
                        description: 'Abdcs lorem ipsum',
                        score: 5,
                        comments: [],
                    },
                ]);
            });

            test('should return correct mockResolvedValue', async () => {
                Ruin.findById.mockReturnValue({
                    populate: () => [
                        {
                            name: 'Teatro Romano',
                            location: 'Mérida',
                            description: 'Abdcs lorem ipsum',
                            score: 5,
                            comments: [],
                        },
                    ],
                });

                await controller.getRuin(req, res);

                expect(res.json).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledWith([
                    {
                        name: 'Teatro Romano',
                        location: 'Mérida',
                        description: 'Abdcs lorem ipsum',
                        score: 5,
                        comments: [],
                    },
                ]);
            });
        });

        describe('And it does not work (promise is rejected)', () => {
            test('Then call next', async () => {
                Ruin.findById.mockResolvedValue([
                    {
                        populate: () => {
                            throw new Error('Test error');
                        },
                    },
                ]);

                await controller.getRuin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When deleteRuin is called', () => {
        describe('And it works', () => {
            beforeEach(() => {
                Ruin.findByIdAndDelete.mockResolvedValue([
                    {
                        'Delete Ruin': 12,
                    },
                ]);
            });

            test('Then call json', async () => {
                await controller.deleteRuin(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Ruin.findByIdAndDelete.mockRejectedValue('Test error');
                await controller.deleteRuin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When updateRuin is called', () => {
        describe('And it works', () => {
            beforeEach(() => {
                Ruin.findByIdAndUpdate.mockResolvedValue([
                    {
                        mockRuinName: 'hola',
                    },
                ]);
            });

            test('Then call json', async () => {
                await controller.updateRuin(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Ruin.findByIdAndUpdate.mockRejectedValue('Test error');
                await controller.updateRuin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When addRuin is called', () => {
        describe('And it works', () => {
            test('should return correct mockResolvedValue', async () => {
                Ruin.create.mockResolvedValue([mockRuin]);

                await controller.addRuin(req, res);

                expect(res.json).toHaveBeenCalled();
            });
        });

        describe('And it not works (promise is rejected)', () => {
            test('Then call next', async () => {
                Ruin.create.mockRejectedValue('Test error');
                await controller.addRuin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When addFavorite is called', () => {
        // describe('If the user does not have this location as favorite', () => {
        //     beforeEach(() => {
        //         User.findByIdAndUpdate.mockResolvedValue([
        //             { _id: 'req.tokenPayload.id' },
        //         ]);
        //     });

        //     describe('Then it adds it as favorite', () => {
        //         beforeEach(() => {
        //             updatedUser = User.findByIdAndUpdate.mockResolvedValue(
        //                 {
        //                     $pull: { favorites: req.params.id },
        //                 },
        //                 { new: true }
        //             );
        //             console.log(updatedUser);
        //         });
        //         test('it should add the ruin id to user favorites', async () => {
        //             await updatedUser.toEqual();
        //             expect(res.json).toHaveBeenCalled();
        //         });
        //     });
        // });

        describe('And it does not work (promise is rejected)', () => {
            test('Then call next', async () => {
                User.create.mockRejectedValue('Test error');
                await controller.addRuin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });
});
