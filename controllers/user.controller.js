import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export async function userLogin(req, res) {
    const userData = {
        userName: req.body?.userName, //Si no hay username, chapa
        password: req.body?.password,
    };

    //const userData = req.body;
    const resp = await User.findOne({
        userName: userData.userName,
    });

    if (
        resp.userName === userData.userName &&
        bcrypt.compareSync(userData.password, resp.password)
    ) {
        const token = createToken(userData);
        res.json({ token }); //Devolver info de usuario
        return;
    } else {
        return res.status(404).json({
            message:
                'Error, el usuario no existe' +
                ' ' +
                userData.userName +
                ' ' +
                userData.password,
        });
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const resp = await User.find({}).populate('tasks');
        res.json(resp);
    } catch (err) {
        next(err);
    }
};

export const userRegister = async (req, resp) => {
    const encryptedPasswd = bcrypt.hashSync(req.body.passwd);
    const userData = { ...req.body, passwd: encryptedPasswd };
    const newUser = new User(userData);
    const result = await newUser.save();
    resp.json(result);
};
