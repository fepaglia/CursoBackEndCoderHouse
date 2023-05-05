import userModel from './models/users.model.js';

export default class dbUsersManager {
    constructor(){}
    
    createUser = async (user) =>{
        return await userModel.create(user);
    }  

    getUser = async (email) =>{
        return await userModel.findOne({ email })
    };

    getUserById = async (id) =>{
        return await userModel.findOne({ _id: id })
    };

    updateUser = async (email, user) =>{
        return await userModel.updateOne({ email }, user)
    }

};