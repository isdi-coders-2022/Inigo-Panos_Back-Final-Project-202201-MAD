import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../index.js';
import * as mock from '../utils/mock';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';
import { Ruin } from '../models/ruin.model.js';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzA0ZGM5NTc2MjIyNGY0Yjc5NmQ5OCIsImlhdCI6MTY0NzM3NzY5NH0.KfR5gpq03jpzF0MErkiXVTYc8Q7nba4HIUj3l96NXyE';

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
    let tokenUser;
    let ruinId;
    let commentId;

    describe('TESTING USERS NODE', () => {
        describe('When GET /users', () => {
            test('It returns status 200', async () => {
                const response = await request(app).get('/users');
                expect(response.status).toBe(200);
            });
        });
        describe('When POST /users/register', () => {
            test('It returns status 201', async () => {
                const resp = await request(app)
                    .post('/users/register')
                    .send({ userName: 'pepe', password: '1111' });
                id = resp.body._id;
                expect(resp.status).toBe(201);
            });
            describe('User creation requires the fields name and password', () => {
                test('It returns status 200', async () => {
                    const resp = await request(app)
                        .post('/users/register')
                        .send({ userName: 'pepe', password: '1111' });
                    expect(resp.status).toBe(201);
                });
            });
        });
        describe('When POST /users/login', () => {
            test('It returns status 201', async () => {
                const resp = await request(app)
                    .post('/users/login')
                    .send({ userName: 'pepe', password: '1111' });
                tokenUser = resp.body.token;
                expect(resp.status).toBe(200);
            });
            describe('If the user or password is wrong', () => {
                test('It returns status 401', async () => {
                    const res = await request(app)
                        .post('/users/login')
                        .send({ userName: 'pepe', password: '111' });
                    expect(res.status).toBe(401);
                    // expect(res.body.error).toBe('User or password invalid');
                });
            });
        });
    });
    describe('TESTING COMMENT NODE', () => {
        describe('When GET /comments', () => {
            test('It returns status 200', async () => {
                const response = await request(app)
                    .get('/ruins')
                    .set('Authorization', 'bearer ' + tokenUser);
                expect(response.status).toBe(200);
            });
        });
        //     describe('When POST /comments', () => {
        //         test('It returns status 200', async () => {
        //             const response = await request(app)
        //                 .post('/comments')
        //                 .set('Authorization', 'bearer ' + tokenUser)
        //                 .send({
        //                     title: 'New comments',
        //                     type_incidence: 'Break',
        //                     id_apartment: ruinId,
        //                     id_user: id,
        //                 });
        //             commentId = response.body._id;
        //             expect(response.status).toBe(201);
        //         });
        //     });
        //     describe('When DELETE /comments', () => {
        //         test('It returns status 200', async () => {
        //             const response = await request(app)
        //                 .delete(`/comments/${commentId}`)
        //                 .set('Authorization', 'bearer ' + tokenUser);
        //             expect(response.status).toBe(200);
        //         });
        //     });
    });

    // describe('TESTING APARTMENTS NODE', () => {
    //     beforeAll(async () => {
    //         await Apartment.deleteMany({});
    //     });

    //     describe('When POST /apartments', () => {
    //         test('It returns status 200', async () => {
    //             const response = await request(app)
    //                 .post('/apartments')
    //                 .set('Authorization', 'bearer ' + token)
    //                 .send({
    //                     direction: 'C/Vallehermoso,110',
    //                     cp: '28010',
    //                     province: 'Madrid',
    //                     current_user: '62304dc95762224f4b796d98',
    //                     status: 'Leased',
    //                     photos: [],
    //                     owner: id,
    //                 });
    //             ruinId = response.body._id;
    //             expect(response.status).toBe(201);
    //         });
    //     });
    //     describe('When GET /apartments', () => {
    //         test('It returns status 200', async () => {
    //             const response = await request(app)
    //                 .get('/incidents')
    //                 .set('Authorization', 'bearer ' + token);
    //             expect(response.status).toBe(200);
    //         });
    //     });
    //     describe('When PATCH /apartments', () => {
    //         test('It returns status 200', async () => {
    //             const response = await request(app)
    //                 .patch(`/apartments/${ruinId}`)
    //                 .set('Authorization', 'bearer ' + tokenUser)
    //                 .send({ newProperty: 'new' });
    //             expect(response.status).toBe(200);
    //         });
    //     });
    //     describe('When PATCH /apartments with wrong authorization type', () => {
    //         test('It returns status 401', async () => {
    //             const response = await request(app)
    //                 .patch(`/apartments/${ruinId}`)
    //                 .set('Authorization', 'camion ' + tokenUser)
    //                 .send({ newProperty: 'new' });
    //             expect(response.status).toBe(401);
    //             expect(response.body.error).toBe('token missing or invalid');
    //         });
    //     });
    // });
});
