import { Router } from 'express';
import { createHash } from '../../utils.js';
import userModel from '../../models/users.model.js';
import passport from 'passport';

const router = Router();

router.post('/register',
    passport.authenticate('register', { failureRedirect: 'fail-register'}),
    async (req, res) => {
    res.send({status: 'success', message: 'user registered'});
  
});
  
router.post('/login', 
    passport.authenticate('login'), 
    async (req, res) => {
  
      if(!req.user) return res.status(400)
          .send({status: 'error', message: 'Invalid Credentials'});
  
      req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name, 
          age: req.user.age,
          email: req.user.email
      };
  
       res.send({ status: 'success', message: 'login success' });
});

router.get('/github', 
    passport.authenticate('github', {scope: ['user:email']}),
    async (req,res)=>{
    req.send({status: 'success', message: 'User Registered'})
});

router.get('/githubcallback', 
    passport.authenticate('github', {failureRedirect: '/login'}), 
    async (req,res)=>{
        req.session.user = req.user;
        res.redirect('/');
});
  
router.get('/fail-login', async (req,res)=>{
    res.send({status: 'error', message:'login-failed'});
});

router.get('/fail-register', (req,res)=>{
    res.send({status: 'error', message:'register-failed'});
});

router.post('/reset', async (req, res) => {
    const { email, password } = req.body;
  
    if(!email || !password) return res.status(400)
      .send({status: 'error', message: 'Incomplete Values'});
  
    try {                     
        const user = await userModel.findOne({ email });
  
        if (!user) return res.status(404).send({ status: 'error', message: 'User not Found' });
  
        user.password = createHash(password);
  
        await userModel.updateOne({ email }, user);
  
        res.send({ status: 'success', message: 'Reset Success' });
  
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/logout', async (req,res) =>{
    req.session.destroy(err =>{
        if(err) {
            res.status(500).send({status: 'error', error: 'couldnt logout'})
        } else {
            console.log("Session destroyed successfully!");
            res.redirect('/login');
        }
    })
});

export default router;