import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { createToken } from '../services/auth.js';

export async function userLogin(req, res) {
    const userData = {
        userName: req.body?.userName,
        password: req.body?.password,
    };

    const resp = await User.findOne({
        userName: userData.userName,
    });

    if (
        resp.userName === userData.userName &&
        bcrypt.compareSync(userData.password, resp.password)
    ) {
        const token = createToken(userData);
        res.json({ token });
        return;
    } else {
        return res.status(404).json({
            message:
                'Error, el usuario o contraseña no existe' +
                ' ' +
                userData.userName +
                ' ' +
                userData.password,
        });
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const resp = await User.find({});
        res.json(resp);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const resp = await User.findById(req.params.id);
        res.status(200);
        res.json(resp);
    } catch (err) {
        next(err, 'no existe el usuario especificado.');
    }
};

export async function userRegister(req, res) {
    const encryptedPasswd = bcrypt.hashSync(req.body.password);

    const userData = { ...req.body, password: encryptedPasswd };

    const result = await User.create(userData);

    res.json(result);
}

// DETAILS

export const addFavorite = async (req, res, next) => {
    try {
        const resp = await Ruin.findById(req.params.id).populate({
            path: 'favorites',
            populate: [
                {
                    path: 'author_id',
                    select: 'userName',
                },
            ],
        });
        res.status(200);
        res.json(resp);
    } catch (err) {
        next(err, 'no existe la ruina especificada.');
    }
};
