import { User } from '../models/user.model.js';

export const adminRequired = async (req, res, next) => {
    let token = req.tokenPayload;
    const user = await User.findById(token.userId);
    if (user.isAdmin) {
        next();
    } else {
        const userError = new Error('not authorized user');

        userError.status = 401;
        next(userError);
    }
};
