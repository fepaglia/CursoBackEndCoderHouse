import { Router } from 'express';
import { cartView, productsView, privateAccess, publicAccess } from '../../controllers/views.controllers.js';

const router = Router();



router.get('/products', privateAccess, productsView );

router.get('/carts/:cid', privateAccess , cartView);

router.get('/', publicAccess, async (req, res) => {
    res.redirect('/login');
  });

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
  });
  
router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});
  
router.get('/reset', publicAccess, (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {
    res.redirect('/products');
});

export default router;