import { Router } from 'express';
import { cartView, productsView, productView, privateAccess, publicAccess } from '../../controllers/views.controllers.js';

const router = Router();

router.get('/products', privateAccess, productsView);

router.get('/products/:pid', privateAccess, productView);

router.get('/carts/:cid', privateAccess , cartView);

router.get('/', publicAccess, async (req, res) => {
    res.redirect('/login');
  });


router.get('/register', publicAccess, (req, res) => {
    res.render('register', {style: 'register.css'});
  });
  
router.get('/login', publicAccess, (req, res) => {
    res.render('login', {style: 'login.css'});
});
  
router.get('/reset', publicAccess, (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {
    res.redirect('/products');
});

export default router;