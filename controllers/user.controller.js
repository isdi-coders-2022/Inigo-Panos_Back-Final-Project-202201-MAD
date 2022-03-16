import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { createToken } from '../services/auth.js';

export async function userLogin(req, res) {
    const userData = {
        userName: req.body?.userName,
        password: req.body?.password,
        _id: req.body?.id,
    };
    const resp = await User.findOne({
        userName: userData.userName,
    });

    if (
        resp.userName === userData.userName &&
        bcrypt.compareSync(userData.password, resp.password)
    ) {
        userData._id = resp._id;
        console.log(userData);
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
