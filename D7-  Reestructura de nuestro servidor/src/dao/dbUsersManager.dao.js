import userModel from './models/users.model.js';

export default class dbUsersManager {
    constructor(){}

    getUser = async (email) =>{
        return await userModel.findOne({ email })
    };

    updateUser = async (email, user) =>{
        return await userModel.updateOne({ email }, user)
    }

    createUser = async (newUser) =>{
        return await userModel.create(newUser);
    }  
};