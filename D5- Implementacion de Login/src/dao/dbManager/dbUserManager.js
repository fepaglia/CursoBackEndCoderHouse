import userModel from '../../models/users.model.js';

export default class dbUserManager {
    constructor(){
        console.log('Working with USERS in mongoDB');
    };

    createUser = async (user) =>{
        try {
            const exists = await userModel.findOne({ email });
            if (exists) return res.status(400).send({status: 'error', message: 'user already exists'});
        
            const user = {
                first_name,
                last_name,
                email,
                age,
                password
            };
            
           const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', error});
        }
    }

    loginUser = async (email, password) =>{
        try {
            const user = await userModel.findOne({ email, password});
            if (!user) return res.status(400).send({status: 'error', message: 'incorrect'});
    
            req.session.user = {
                name:`${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age
            }
            req.redirect('/products');

            return res.send({status: 'success', message: 'login success'})
            
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', error});
        }
    }


    
}