import  {
    findUser as findUserServices ,
    updateUser as updateUserServices
} from '../services/users.services.js';
import { createHash } from '../utils.js';

import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from '../services/errors/info.js';



const updateUser = async (req, res) => {
    const { email, password } = req.body;
  
    if(!email || !password) return res.status(400)
      .send({status: 'error', message: 'Incomplete Values'});
  
    try {                     
        const user = await findUserServices( email );
  
        if (!user) return res.status(404).send({ status: 'error', message: 'User not Found' });
  
        user.password = createHash(password);
  
        await updateUserServices(email , user);
  
        res.send({ status: 'success', message: 'Reset Success' });
  
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, age } = req.body;

        if(!first_name || !last_name || !email || !age) {
            throw CustomError.createError({
                name: 'User Error',
                cause: generateUserErrorInfo({
                    first_name, last_name, email, age
                }),
                code: EErrors.INCOMPLETE_FIELDS_USER_REGISTER_ERROR,
                message: 'Error tratando de crear un usuario'
            });
        };

    try {  
      res.send({ status: "success", message: "user registered" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', error });
    }
};

const logOut =  async (req,res) =>{
    req.session.destroy(err =>{
        if(err) {
            res.status(500).send({status: 'error', error: 'couldnt logout'})
        } else {
            console.log("Session destroyed successfully!");
            res.redirect('/login');
        }
    })
};

const login = async (req, res) => {
    
    if(!req.user) return res.status(400)
    .send({status: 'error', message: 'Invalid Credentials'});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name, 
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        carts: req.user.carts
    };

    console.log(req.session.user.carts)

    res.send({ status: 'success', message: 'login success' });
};

const github = async (req,res)=>{
    req.send({status: 'success', message: 'User Registered'})
}

const githubCallback =  async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/');
}

const failLogin = async (req,res)=>{
    res.send({status: 'error', message:'login-failed'});
};

const failRegister = async  (req,res)=>{
    res.send({status: 'error', message:'register-failed'});
}

const current = async (req,res) =>{
    const user = req.user;

     res.render('current', user);
}

export {
    updateUser,
    createUser,
    logOut,
    login,
    github,
    githubCallback,
    failLogin,
    failRegister,
    current
}