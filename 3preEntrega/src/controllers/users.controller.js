import  {
    findUser as findUserServices ,
    updateUser as updateUserServices
} from '../services/users.services.js';
import { createHash } from '../utils.js';

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
        email: req.user.email
    };
    

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

export {
    updateUser,
    createUser,
    logOut,
    login,
    github,
    githubCallback,
    failLogin,
    failRegister
}