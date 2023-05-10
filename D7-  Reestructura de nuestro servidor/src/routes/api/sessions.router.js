import { Router } from 'express';

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

router.post('/login', login);
router.get('/fail-login', failLogin );

router.post('/register', createUser);
router.get('/github', github);
router.get('/githubcallback',  githubCallback);
router.get('/fail-register', failRegister);

router.get('/current', current)

router.post('/reset', updateUser);

router.get('/logout', logOut);

export default router;