import {UserModel} from '../schemas.js';

export const UserRepository = {
    create: async (data) => {
        const newUser = new UserModel(data);
        const savedUser = await newUser.save();
        return savedUser;
    }, findByEmail: async (email) => {
        try {
            return await UserModel.findOne({email: email})
        } catch (err) {
            return null;
        }
    }
}