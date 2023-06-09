import userModel from './models/users.model.js';

export default class dbUsersManager {
    constructor(){}
    
    createUser = async (user) =>{
        return await userModel.create(user);
    }  

    getUser = async (email) =>{
        return await userModel.findOne({ email })
    };

    getUserById = async (uid) =>{
        return await userModel.findOne({ _id: uid })
    };

    updateUserPass = async (email, user) =>{
        return await userModel.updateOne({ email }, user)
    };

    createCartUser = async (userId, newCart) =>{
        return await userModel.findByIdAndUpdate(userId, { $push: { carts: { _id: newCart._id } } });
    };
};