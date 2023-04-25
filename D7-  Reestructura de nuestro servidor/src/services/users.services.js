import { USERSDAO } from '../dao/index.js';

const saveUser = async (user) =>{
    await USERSDAO.createUser(user);
    return user
};

const findUser = async (email) =>{
    const user = await USERSDAO.getUser(email);
    return user;
};

const getUserById = async (id) =>{
    const userId = await USERSDAO.getUserById(id);
    return userId
}

const updateUser = async (email, user) =>{
    const update = await USERSDAO.updateUser(email, user);
    return update;
}

export {
    saveUser,
    findUser,
    updateUser,
    getUserById
}