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

    updateUser = async (email, user) =>{
        return await userModel.updateOne({ email }, user)
    }

};