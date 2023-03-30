import { Router } from 'express';

import dBCartManager from '../../dao/dbManager/dbCartManager.js';
import dBProductManager from '../../dao/dbManager/dbProductManager.js';

const dbcartmanager = new dBCartManager();
const dbproductmanager = new dBProductManager();

const router = Router();

const publicAccess = (req, res, next) =>{
    if(req.session.user) return res.redirect('/products');
    next();
};

const privateAccess = (req, res, next) =>{
    if(!req.session.user) return res.redirect('/login');
    next();
}


router.get('/products', privateAccess, async (req,res)=>{
    try {
        const { limit = 10 } = req.query;
        const { page = 1 } = req.query;
        const sort = req.query.sort;

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await dbproductmanager.getProducts(limit, page, sort);
        const products = docs;

        res.render('products', {
            products, 
            hasPrevPage, 
            hasNextPage,
            nextPage, 
            prevPage, 
            style: 'products.css'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

router.get('/carts/:cid', privateAccess ,async (req, res) =>{
    const id = req.params.cid;
    try {
        let cart = await dbcartmanager.getCartById(id);

        res.render('carts', cart);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
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
    res.render('profile', {
      user: req.session.user,
    });
});

export default router;