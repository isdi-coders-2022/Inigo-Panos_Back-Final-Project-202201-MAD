import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { createToken } from '../services/auth.js';

export async function userLogin(req, res, next) {
    console.log(req.body);
    const userData = {
        userName: req.body?.userName,
        password: req.body?.password,
        _id: req.body?.id,
    };

    const loginError = {
        message: 'Error, el usuario o contraseña no existe',
    };

    const resp = await User.findOne({
        userName: userData.userName,
    });

    console.log(resp.userName, userData.userName);

    if (
        resp.userName === userData.userName &&
        bcrypt.compareSync(userData.password, resp.password)
    ) {
        userData._id = resp._id;
        let userId = userData._id;
        userId = userId.toString();
        console.log(userId);

        const token = createToken(userData);
        console.log('El token es: ', token, ' y el id: ', userId);

        let result = {
            token: token,
            id: userId,
        };
        console.log({ result });
        res.json({ result });
        return;
    } else {
        res.status(401);
        res.json(loginError);
    }
}

export const getAllUsers = async (req, res, next) => {
    console.log(req.body);
    try {
        const resp = await User.find({});
        res.json(resp);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const resp = await User.findById(req.params.id);
        res.status(200);
        res.json(resp);
    } catch (err) {
        next(err, 'no existe el usuario especificado.');
    }
};

export async function userRegister(req, res) {
    console.log(req.body);
    const encryptedPasswd = bcrypt.hashSync(req.body.password);

    const userData = { ...req.body, password: encryptedPasswd };

    const result = await User.create(userData);

    res.status(201);
    res.json(result);
}
