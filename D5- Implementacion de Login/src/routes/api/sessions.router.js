import { Router } from 'express';
import dbUserManager from '../../dao/dbManager/dbUserManager.js';

const dbusermanager = new dbUserManager();
const router = Router();

router.post('/register', async (req,res)=>{
    const {first_name, last_name, email, age, password} = req.body;

    try {
        await dbusermanager.createUser(first_name, last_name, email, age, password)
        res.send({status: 'success', message: 'user registered'});
        console.log(message);

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error});
    }
})

router.post('/login', async (req,res) =>{
    const { email, password } = req.body;
    await dbusermanager.loginUser(email, password);
})
  

router.get('/logout', async (req,res) =>{
    req.session.destroy(err =>{
        if(err) res.status(500).send({status: 'error', error: 'couldnt logout'})
        res.redirect('/login');
    })
})


export default router;