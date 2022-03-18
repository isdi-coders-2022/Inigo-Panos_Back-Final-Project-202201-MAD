import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../index.js';
import * as mock from '../utils/mock';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';
import { Ruin } from '../models/ruin.model.js';

describe('Given app', () => {
    afterAll(() => {
        mongoose.disconnect();
        server.close();
    });
    beforeAll(async () => {
        await User.deleteMany({});
        await Ruin.deleteMany({});
        await Comment.deleteMany({});
    });

    let id;
    let tokenAdmin;
    let idPatchRuins;
    let commentId;

    describe('TESTING USERS NODE', () => {
        describe('When POST /users/register', () => {
            test('It returns status 201', async () => {
                const resp = await request(app).post('/users/register').send({
                    userName: 'pepe',
                    password: '1111',
                    isAdmin: true,
                });
                id = resp.body._id;
                expect(resp.status).toBe(201);
            });
        });
        describe('When POST /users/login', () => {
            test('It returns status 201', async () => {
                const resp = await request(app)
                    .post('/users/login')
                    .send({ userName: 'pepe', password: '1111' });
                tokenAdmin = resp.body.token;
                tokenAdmin = tokenAdmin.token;

                expect(resp.status).toBe(200);
            });
            describe('If the user or password is wrong', () => {
                test('It returns status 401', async () => {
                    const res = await request(app)
                        .post('/users/login')
                        .send({ userName: 'pepe', password: '111' });
                    expect(res.status).toBe(401);
                });
            });
        });
        describe('When GET /users', () => {
            test('It returns status 200', async () => {
                const response = await request(app).get('/users');

                expect(response.status).toBe(200);
            });
        });
    });

    describe('TESTING RUINS NODE', () => {
        describe('When POST /ruins', () => {
            test('It returns status 200', async () => {
                const response = await request(app)
                    .post('/ruins/add')
                    .set('Authorization', 'bearer ' + tokenAdmin)
                    .send({
                        name: 'Teatro romano',
                        location: 'Mérida',
                        description: 'Teatro romano de Mérida',
                        score: 5,
                    });

                idPatchRuins = response.body._id;
                expect(response.status).toBe(201);
            });
        });
        describe('When GET /ruins', () => {
            test('It returns status 200', async () => {
                const response = await request(app)
                    .get('/ruins')
                    .set('Authorization', 'bearer ' + tokenAdmin);
                expect(response.status).toBe(200);
            });
        });
        // describe('When PATCH /ruins', () => {
        //     test('It returns status 200', async () => {
        //         const response = await request(app)
        //             .patch(`/ruins/${idPatchRuins}`)
        //             .set('Authorization', 'bearer ' + tokenAdmin)
        //             .send({ newProperty: 'new' });
        //         expect(response.status).toBe(200);
        //     });
        // });
        // describe('When PATCH /ruins with wrong authorization type', () => {
        //     test('It returns status 401', async () => {
        //         const response = await request(app)
        //             .patch(`/ruins/${idPatchRuins}`)
        //             .set('Authorization', 'camion ' + tokenAdmin)
        //             .send({ newProperty: 'new' });
        //         expect(response.status).toBe(401);
        //         expect(response.body.error).toBe('tokenAdmin missing or invalid');
        //     });
        // });
    });

    // describe('TESTING COMMENT NODE', () => {
    //     describe('When GET /comments', () => {
    //         test('It returns status 200', async () => {
    //             const response = await request(app)
    //                 .get('/ruins')
    //                 .set('Authorization', 'bearer ' + tokenAdmin);
    //             expect(response.status).toBe(200);
    //         });
    //     });
    //     describe('When PATCH /comment', () => {
    //         test('It returns status 201', async () => {
    //             console.log(tokenAdmin);
    //             const res = await request(app)
    //                 .patch('/ruins/623470c154b6888c54be7185/comment')
    //                 .send(mock.commentMock)
    //                 .set('Authorization', 'bearer ' + tokenAdmin);

    //             console.log(res, ' res de body, supertest');
    //             commentId = res.body._id;
    //             console.log(mock.commentMock);
    //             expect(res.status).toBe(201);
    //         });
    //     });
    // describe('When DELETE /comments', () => {
    //     test('It returns status 200', async () => {
    //         const response = await request(app)
    //             .delete(`/comments/${commentId}`)
    //             .set('Authorization', 'bearer ' + tokenAdmin);
    //         expect(response.status).toBe(200);
    //     });
    // });
});
