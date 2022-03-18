import { User } from '../models/user.model.js';

export const adminRequired = async (req, res, next) => {
    console.log('admin middleware');
    let token = req.tokenPayload;
    const user = await User.findById(token.userId);
    if (user.isAdmin) {
        console.log('User is admin');
        next();
    } else {
        const userError = new Error('not authorized user');
        console.log(userError);
        userError.status = 401;
        next(userError);
    }
};
