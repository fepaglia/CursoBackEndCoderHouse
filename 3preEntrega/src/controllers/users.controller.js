import  {
    findUser as findUserServices ,
    updateUserPass as updateUserPassServices
} from '../services/users.services.js';
import { createHash } from '../utils.js';
import { generateToken } from '../config/jwt.config.js';
import logger from '../config/winston.config.js';

const changePass = async (req, res) => {
    const { email, password } = req.body;
  
    if(!email || !password) return res.status(400)
      .send({status: 'error', message: 'Incomplete Values'});
  
    try {                     
        const user = await findUserServices( email );
  
        if (!user) return res.status(404).send({ status: 'error', message: 'User not Found' });
  
        user.password = createHash(password);
  
        await updateUserPassServices(email , user);
  
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
    req.session.destroy((err) => {
        if (err) {
          res.status(500).send({ status: 'error', error: 'couldnt logout' });
        } else {
          console.log('Session destroyed successfully!');
          res.clearCookie('cookieToken');
          res.redirect('/login');
        }
      });
};

const login = async (req, res) => {
  
    if(!req.user) return res.status(400)
        .send({status: 'error', message: 'Invalid Credentials'});

    const accessToken = await generateToken(req.user);
    
    res.cookie('cookieToken', accessToken, {
        maxAge: 2 * 60 * 60 * 1000, // 2hs
        httpOnly: true
    })

    logger.warning(accessToken);

    res.send({ status: 'success',acces_token: accessToken, message: 'login success' });
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
     res.send({status: 'success', payload: user});
}

export {
    changePass,
    createUser,
    logOut,
    login,
    github,
    githubCallback,
    failLogin,
    failRegister,
    current
}