import { Router } from 'express';
import { createHash, isValidPassword } from '../../utils.js';
import userModel from '../../models/users.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).send({ status: 'error', error: 'user already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        };

        await userModel.create(user);

        res.send({ status: 'success', message: 'user registered' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400)
        .send({ status: 'error', message: 'Incomplete values' });
        console.log('Incomplete values');

    try {
        const user = await userModel.findOne({ email });

        if (!user){ 
            res.status(404).send({ status: 'error', message: 'User not fund' });
            console.log('User not fund')
        };

        if (!isValidPassword(user, password)){
            res.status(401).send({ status: 'error', message: 'Invalid credentials' });
            console.log('Invalid credentials');
        };

        delete user.password;

        req.session.user = user;
        
        res.send({status: 'success', message: 'login success' });
        console.log('Login Success');

    } catch (error) {
        res.status(500).send({ status:'error'});
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
})


export default router;