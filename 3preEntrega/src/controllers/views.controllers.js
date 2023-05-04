import { getProducts as getProductsServices} from '../services/products.services.js';
import { getCartById as getCartByIdServices } from '../services/carts.services.js'

const productsView = async (req,res)=>{
    try {
        const { limit = 10 } = req.query;
        const { page = 1 } = req.query;
        const sort = req.query.sort;

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsServices(limit, page, sort);
        const products = docs;
        const user = req.user;
        console.log(user);
        res.render('products', {
            products,
            user: req.user,
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
};

const cartView = async (req, res) =>{
    const id = req.params.cid;
    try {
        let cart = await getCartByIdServices(id);

        res.render('carts', cart);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const realTimeProducts =async (req,res)=>{
    res.render('realTimeProducts', { style: 'realTimeProducts.css' });
}


const publicAccess = (req, res, next) =>{
    if(req.session.user) return res.redirect('/products');
    next();
};

const privateAccess = (req, res, next) =>{
    if(!req.session.user) return res.redirect('/login');
    next();
}

export {
    cartView,
    productsView,
    publicAccess,
    privateAccess,
    realTimeProducts
}