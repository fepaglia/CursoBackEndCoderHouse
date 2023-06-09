import { Router } from 'express';
import passport from 'passport';

import { 
    updateUser,
    createUser,
    logOut,
    login,
    github,
    githubCallback,
    failLogin,
    failRegister,
    current
} from '../../controllers/users.controller.js';


const router = Router();

router.post('/login', passport.authenticate('login'), login);

router.get('/fail-login', failLogin );

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register'}), createUser);
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), github);
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),  githubCallback);
router.get('/fail-register', failRegister);

router.get('/current', current)

router.post('/reset', updateUser);

router.get('/logout', logOut);

export default router;